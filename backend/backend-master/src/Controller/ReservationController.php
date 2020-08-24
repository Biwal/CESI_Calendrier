<?php

namespace App\Controller;

use App\ControllerHelper\ClosureDaysControllerHelper;
use App\ControllerHelper\ReservationsControllerHelper;
use App\Entity\Promotion;
use App\Entity\Reservation;
use App\Entity\Room;
use App\Repository\PromotionRepository;
use App\Repository\ReservationRepository;
use App\Repository\RoomRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/reservation", name="admin_promotion")
 */
class ReservationController extends AbstractController
{
    /**
     * @Route("/test", name="_test")
     * @param Request $request
     * @param SerializerInterface $serializer
     * @param EntityManagerInterface $entityManager
     * @param ReservationsControllerHelper $reservationsControllerHelper
     * @return JsonResponse
     */
    public function test(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager, ReservationsControllerHelper $reservationsControllerHelper) {
        /** @var RoomRepository $roomRep */
        $data = json_decode($request->getContent(), true);
        /** @var Reservation $newReservation */
        $newReservation = $serializer->deserialize($request->getContent(),Reservation::class,'json');
        $newReservation->setId(isset($data['id']) ? $data['id'] : null);
        $capacity = isset($data['promotion']) ? $data['promotion']['size'] : $data['event']['capacity'];

        if($capacity > $newReservation->getRoom()->getCapacity() && (!isset($data['force']) || !$data['force'])) {
            return $this->json([
                'success' => false,
                'alertSize' => true,
                'message' => "La salle ne contient pas assez de place"
            ]);
        } else {
            $result = $reservationsControllerHelper->processEachDays($newReservation, (isset($data['fusion']) && $data['fusion']), (isset($data['force']) && $data['force']));
            $entityManager->flush();
            return $this->json($result);
        }
    }

    // Check > 1 day
    // days off
    // other resa
    // --> fusion possible ?
    // Check 1 day

    /**
     * @Route("/check", name="_check_reservation", methods={"POST"})
     * @param Request $request
     * @param EntityManagerInterface $em
     * @param SerializerInterface $serializer
     * @param ReservationsControllerHelper $reservationsControllerHelper
     * @return Response
     */
    public function checkReservation(Request $request, EntityManagerInterface $em, SerializerInterface $serializer, ReservationsControllerHelper $reservationsControllerHelper): Response
    {
        $data = json_decode($request->getContent(), true);
        /** @var Reservation $newReservation */
        $newReservation = $serializer->deserialize($request->getContent(),Reservation::class,'json');
        $newReservation->setId(isset($data['id']) ? $data['id'] : null);
        $capacity = isset($data['promotion']) ? $data['promotion']['size'] : $data['event']['capacity'];

        return $this->json($reservationsControllerHelper->checkReservation($newReservation, $capacity));
    }
}
