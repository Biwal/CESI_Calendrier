<?php

namespace App\Controller;

use App\Entity\Promotion;
use App\Entity\PromotionSchedule;
use App\Entity\Reservation;
use App\Form\PromotionType;
use App\Form\TestType;
use App\Repository\PromotionRepository;
use App\Repository\ReservationRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/promotions", name="admin_promotion")
 */
class PromotionController extends AbstractController
{
    /**
     * @Route("/get-active-for-week", name="_get_active_for_week", methods={"GET"})
     * @param Request $request
     * @param PromotionRepository $promotionRepository
     * @return Response
     * @throws Exception
     */
    public function getActiveForWeek(Request $request, PromotionRepository $promotionRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $start = new DateTime($data['dateStart']);
        $end = new DateTime($data['dateEnd']);

        $promotions = $promotionRepository->getActiveForWeek($start, $end);

        return $this->json($promotions);
    }


    /**
     * @Route("/schedule", name="_reservation_promo", methods={"POST"})
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return Response
     * @throws Exception
     */
    public function setPromotionReservations(Request $request, EntityManagerInterface $em): Response
    {
        $promotionRep = $em->getRepository(Promotion::class);
        $promotionScheduleRep = $em->getRepository(PromotionSchedule::class);

        /** @var Promotion $promotion */
        $promotion = $promotionRep->find((int) $request->get('promo'));
        $data = json_decode($request->getContent(), true);

        foreach ($data as $reservation){
            if(!isset($reservation['action'])){
                continue;
            }
            $start = new DateTime($reservation['dateStart']);
            $stop = new DateTime($reservation['dateEnd']);

            if ($reservation['action']){
                $promoSchedule = new PromotionSchedule();
                $promoSchedule->setPromotion($promotion);
                $promoSchedule->setDateStart($start);
                $promoSchedule->setDateEnd($stop);
                $em->persist($promoSchedule);
            } else {
                $promoSchedule = $promotionScheduleRep->findOneBy([
                    "promotion" => $promotion,
                    "dateStart" => $start,
                    "dateEnd"  => $stop
                ]);

                $em->remove($promoSchedule);
            }
        }

        $em->flush();

        $reservation = $em->getRepository(Reservation::class)->findBy(['promotion' => $request->get('id')]);
        return $this->json($reservation);
    }

    /**
     * @Route("/byslot", name="promobyslot", methods={"POST"})
     * @param ReservationRepository $reservationRepository
     * @param PromotionRepository $promotionRepository
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function bySlot(ReservationRepository $reservationRepository, PromotionRepository $promotionRepository, Request $request): Response
    {
            $data = json_decode($request->getContent(), true);

            $start = new DateTime( $data['dateStart'] );
            $end = new DateTime( $data['dateEnd'] );
            $reservations = $reservationRepository->getAllForTimeSlot($start, $end);

            $currentPromotionsId = [];
            $currentPromotions = [];

            foreach ($reservations as $reservation) {
                $promotion = $reservation["promotion"]["id"];
                if (in_array($promotion, $currentPromotionsId)){
                    continue;
                } else {
                    array_push($currentPromotionsId, $promotion);
                }
            }

            foreach ($currentPromotionsId as $promotion){
                array_push($currentPromotions, $promotionRepository->find($promotion));
            }

        return $this->json($currentPromotions);
    }
}
