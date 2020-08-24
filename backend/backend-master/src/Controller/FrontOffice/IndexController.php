<?php

namespace App\Controller\FrontOffice;

use App\ControllerHelper\ClosureDaysControllerHelper;
use App\Entity\ClosureDay;
use App\Entity\Event;
use App\Entity\Promotion;
use App\Entity\Reservation;
use App\Entity\Room;
use App\Manager\ApiManager;
use App\Repository\ReservationRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

/**
 * @Route("/api/frontoffice", name="front_office")
 */
class IndexController extends AbstractController
{
    /**
     * @Route("/", name="_index")
     * @param Request $request
     * @param ReservationRepository $reservatonRepository
     * @return JsonResponse
     * @throws Exception
     */
    public function index(Request $request, ReservationRepository $reservatonRepository)
    {
        if (!is_null($request->get('date')) && new DateTime($request->get('date')) !== false) {
            $date = new DateTime($request->get('date'));
        } else {
            $date = new DateTime();
        }

        $bookings = $reservatonRepository->getAllForDay($date);

        return $this->json($bookings);
    }

    /**
     * @Route("/get-bookings-for-week", name="_get_bookings_for_week")
     * @param Request $request
     * @param ReservationRepository $reservatonRepository
     * @return JsonResponse
     * @throws Exception
     */
    public function getBookingsForWeek(Request $request, ReservationRepository $reservatonRepository)
    {
        $data = json_decode($request->getContent(), true);

        $date = isset($data['date']) && (new DateTime($data['date']) !== false) ? new DateTime($data['date']) : new DateTime();

        if($request->get('date') && (new DateTime($request->get('date')) !== false)) {
            $date = new DateTime($request->get('date'));
        }

        [$monday, $friday] = $this->getFirstAndLastDate($date);
        $bookings = $reservatonRepository->getAllForTimeSlot($monday, $friday)->getQuery()->getArrayResult();

        $return = [];

        foreach ($bookings as $key => $booking) {
            $return[] = [
                'id'            => $booking['id'],
                'name'          => $booking['event'] ? $booking['event']['name'] : $booking['promotion']['name'],
                'private'       => $booking['event'] ? $booking['event']['private'] : false,
                'dateStart'     => $booking['dateStart'],
                'dateEnd'       => $booking['dateEnd'],
                'promo'         => $booking['promotion']['active'],
                'color'         => $booking['event'] ? $booking['event']['color'] : $booking['promotion']['pole']['color'],
                'resource'      => $booking['room']['name'],
            ];
        }

        return $this->json($return);
    }


    /**
     * @Route("/get-bookings-for-day", name="_get_bookings_for_day")
     * @param Request $request
     * @param ReservationRepository $reservatonRepository
     * @return JsonResponse
     * @throws Exception
     */
    public function getBookingsForDay(Request $request, ReservationRepository $reservatonRepository)
    {
        $data = json_decode($request->getContent(), true);

        $date = isset($data['date']) && (new DateTime($data['date']) !== false) ? new DateTime($data['date']) : new DateTime();

        if($request->get('date') && (new DateTime($request->get('date')) !== false)) {
            $date = new DateTime($request->get('date'));
        }

        [$start_time, $end_time] = $this->getDay($date);
        $bookings = $reservatonRepository->getAllForTimeSlot($start_time, $end_time)->getQuery()->getArrayResult();

        $return = [];

        foreach ($bookings as $key => $booking){
            $return[] = [
                'id'            => $booking['id'],
                'name'          => $booking['event'] ? $booking['event']['name'] : $booking['promotion']['name'],
                'private'       => $booking['event'] ? $booking['event']['private'] : false,
                'dateStart'     => $booking['dateStart'],
                'dateEnd'       => $booking['dateEnd'],
                'promo'         => $booking['promotion']['active'],
                'color'         => $booking['event'] ? $booking['event']['color'] : $booking['promotion']['pole']['color'],
                'resource'      => $booking['room']['name'],
            ];
        }

        return $this->json($return);
    }

    /**
     * @Route("/daysoff", name="_days_off")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @param ClosureDaysControllerHelper $closureDaysControllerHelper
     * @return JsonResponse
     * @throws Exception
     */
    public function getDaysOff(Request $request, EntityManagerInterface $em, ClosureDaysControllerHelper $closureDaysControllerHelper)
    {
        $rooms = $em->getRepository(Room::class)->findAll();
        $data = json_decode($request->getContent(), true);
        $date = isset($data['date']) && (new DateTime($data['date']) !== false) ? new DateTime($data['date']) : new DateTime();

        if($request->get('date') && (new DateTime($request->get('date')) !== false)) {
            $date = new DateTime($request->get('date'));
        }

        [$first, $last] = $this->getFirstAndLastDate($date);

        $daysOffBetween = $closureDaysControllerHelper->getDaysOffBetween($first, $last);

        $daysOffReservations = [];

        foreach ($daysOffBetween as $day) {
            foreach ($rooms as $room) {
                $reservation = [
                    'dateStart' => (is_string($day['date']) ? new DateTime($day['date']) : clone $day['date'])->setTime(8, 30, 0),
                    'dateEnd' => (is_string($day['date']) ? new DateTime($day['date']) : clone $day['date'])->setTime(17, 30, 0),
                    'resource' => $room->getName(),
                    'private' => false,
                    'name' => isset($day['nom_jour_ferie']) ? $day['nom_jour_ferie'] : 'Fermé'
                ];

                $daysOffReservations[] = $reservation;
            }
        }

        return $this->json($daysOffReservations);
    }

    /**
     * @Route("/reservations_possible", name="reservation")
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     * @throws Exception
     */
    public function validationReservation(Request $request, EntityManagerInterface $entityManager)
    {
        $reservationRepository = $entityManager->getRepository(Reservation::class);
        $roomRepository = $entityManager->getRepository(Room::class);
        $promotionRepository = $entityManager->getRepository(Promotion::class);

        $data = json_decode($request->getContent(), true);

        $response = [
            "success" => false,
        ];

        $start = new DateTime( $data['dateStart']);
        $stop = new DateTime($data['dateEnd']);
        $room = $roomRepository->findOneBy(['name' => $data['room']]);
        $promotion = $promotionRepository->findOneBy(['name' => $data['promotion']]);

        $query = $reservationRepository->getEventOnRoom($room->getId(), $start, $stop);

        switch (count($query)){
            case 0:
                $reservation = new Reservation();

                /** @var Room $room */
                /** @var Promotion $promotion */
                $reservation
                    ->setPromotion($promotion)
                    ->setDateStart($start)
                    ->setDateEnd($stop)
                    ->setRoom($room);

                $entityManager->persist($reservation);
                $entityManager->flush();

                $response['success'] = true;
                break;
            case 1:
                $response['fusion'] = true;
                break;
            default:
                $response['fusion'] = false;
                break;
        }

        return $this->json($response);
    }

    /**
     * @param DateTime $date
     * @return array
     * @throws Exception
     */
    private function getFirstAndLastDate(DateTime $date): array
    {
        $monday = (new DateTime(date('d-m-Y', strtotime('monday this week', $date->getTimestamp()))))->setTime(8, 0);
        $friday = (new DateTime(date('d-m-Y', strtotime('friday this week', $date->getTimestamp()))))->setTime(18, 0);

        return [$monday, $friday];
    }

    /**
     * @param DateTime $date
     * @return array
     */
    private function getDay(DateTime $date): array
    {
        $start = (clone $date)->setTime(8, 0);
        $end = (clone $date)->setTime(18, 0);

        return array($start, $end);
    }
}
