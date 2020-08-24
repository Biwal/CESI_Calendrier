<?php

namespace App\Controller;

use App\Entity\ClosureDay;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/closure_days", name="api_closure_days")
 */
class ClosureDaysController extends AbstractController
{
    /**
     * @Route("/update", name="_update")
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return JsonResponse
     * @throws Exception
     */
    public function updateClosureDays(Request $request, EntityManagerInterface $entityManager) {
        $body = json_decode($request->getContent(), true);
        $closureDays = $body['closuredays'];
        if(!$closureDays || count($closureDays) == 0) return $this->json([]);
        foreach ($closureDays as $closureDay) {
            if(isset($closureDay['action'])) {
                // new closure day
                if($closureDay['action']) {
                    $closureDayObj = new ClosureDay();
                    $closureDayObj->setDate(new DateTime($closureDay['date']));
                    $entityManager->persist($closureDayObj);
                } else {
                    if(isset($closureDay['id'])) {
                        $closureDayObj = $entityManager->getRepository(ClosureDay::class)->find($closureDay['id']);
                        $entityManager->remove($closureDayObj);
                    }
                }
            }
        }

        $entityManager->flush();

        return $this->json([
            'success' => true
        ]);
    }
}