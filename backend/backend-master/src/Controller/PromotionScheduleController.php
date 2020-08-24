<?php

namespace App\Controller;


use App\Entity\Promotion;
use App\Entity\PromotionSchedule;
use App\Repository\PromotionRepository;
use App\Repository\PromotionScheduleRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/promotionschedules", name="promotionschedules")
 */
class PromotionScheduleController extends AbstractController
{
    /**
     * @Route("/bypromoandslot", name="bypromoandslot", methods={"POST"})
     * @param PromotionScheduleRepository $promotionScheduleRepository
     * @param PromotionRepository $promotionRepository
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function byPromoAndSlot(PromotionScheduleRepository $promotionScheduleRepository, PromotionRepository $promotionRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $promo = $data['promotion'];

        /** @var Promotion $promotion */
        if (filter_var($promo, FILTER_VALIDATE_INT)) {
            $promotion = $promotionRepository->find($promo);
        } else {
            $promotion = $promotionRepository->findOneBy(['name'=>$promo]);
        }

        if (isset($data['dateStart']) && isset($data['dateEnd'])){
            $start = new DateTime( $data['dateStart'] );
            $end = new DateTime( $data['dateEnd'] );
            $promotionSchedules = $promotionScheduleRepository->findByPromotionAndSlot($promotion, $start, $end);
        } else {
            $promotionSchedules = $promotionScheduleRepository->findBy(["promotion"=> $promotion]);
        }

        return $this->json($promotionSchedules);
    }

    /**
     * @Route("/addslottopromo", name="_index", methods={"POST"})
     * @param PromotionRepository $promotionRepository
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return void
     * @throws Exception
     */
    public function addSlotToPromo(PromotionRepository $promotionRepository, Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);

        $promo = $data['promotion'];

        /** @var Promotion $promotion */
        if (filter_var($promo, FILTER_VALIDATE_INT)) {
            $promotion = $promotionRepository->find($promo);
        } else {
            $promotion = $promotionRepository->findOneBy(['name'=>$promo]);
        }

        $start = new DateTime( $data['dateStart'] );
        $end = new DateTime( $data['dateEnd'] );

        $promotionSchedules = new PromotionSchedule();

        $promotionSchedules
            ->setPromotion($promotion)
            ->setDateStart($start)
            ->setDateEnd($end);

        $em->persist($promotionSchedules);

        $em->flush();


        return $this->json($promotionSchedules);
    }
}
