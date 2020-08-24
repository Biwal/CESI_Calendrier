<?php

namespace App\ControllerHelper;

use App\Entity\ClosureDay;
use App\Entity\PromotionSchedule;
use App\Entity\Reservation;
use App\Entity\Room;
use DateInterval;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\EntityManagerInterface;

class ReservationsControllerHelper
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var ClosureDaysControllerHelper
     */
    private $closureDaysControllerHelper;

    public function __construct(EntityManagerInterface $entityManager, ClosureDaysControllerHelper $closureDaysControllerHelper)
    {
        $this->closureDaysControllerHelper = $closureDaysControllerHelper;
        $this->entityManager = $entityManager;
    }

    // promotion => process only promotion schedule
    // need to return success
    function processEachDays(Reservation $baseReservation, $fusion = false, $force = false) {
        $alreadyReserved = $this->entityManager->getRepository(Reservation::class)->getAllForTimeSlotInRoom($baseReservation)->getQuery()->getResult();
        $daysOffArray = $this->getArrayDaysOff($baseReservation);

        $hardProcess = $this->isOver8Hours($baseReservation);
        $startTime = explode(':', $baseReservation->getPromotion() && $baseReservation->getPromotion()->getDefaultTimeStart() ? $baseReservation->getPromotion()->getDefaultTimeStart() : "08:30"); // depends promo
        $endTime = explode(':', $baseReservation->getPromotion() && $baseReservation->getPromotion()->getDefaultTimeEnd() ? $baseReservation->getPromotion()->getDefaultTimeEnd() : "17:30"); // depends promo

        if($baseReservation->getPromotion()) {
            $promotionSchedules = $this->entityManager->getRepository(PromotionSchedule::class)->findByPromotionAndSlot($baseReservation->getPromotion(), $baseReservation->getDateStart(), $baseReservation->getDateEnd())->getResult();

            /** @var PromotionSchedule $promotionSchedule */
            foreach ($promotionSchedules as $promotionSchedule) {
                $newBaseReservation = clone $baseReservation;
                $newBaseReservation->setDateStart($baseReservation->getDateStart() > $promotionSchedule->getDateStart() ? $baseReservation->getDateStart() : $promotionSchedule->getDateStart());
                $newBaseReservation->setDateEnd($baseReservation->getDateEnd() > $promotionSchedule->getDateEnd() ? $promotionSchedule->getDateEnd() : $baseReservation->getDateEnd());
                $result = $this->processOverInterval($daysOffArray, $alreadyReserved, $baseReservation, $newBaseReservation, $startTime, $endTime, $hardProcess, $fusion, $force);
                if(!$hardProcess) return $result;
            }
        } else {
            $result = $this->processOverInterval($daysOffArray, $alreadyReserved, $baseReservation, $baseReservation, $startTime, $endTime, $hardProcess, $fusion, $force);
            if(!$hardProcess) return $result;
        }

        return [
            'success' => true
        ];
    }

    private function processOverInterval(array &$daysOff, &$alreadyReserved, Reservation $firstReservation, Reservation $baseReservation, $startTime, $endTime, bool $longProcess = true, $fusion = false, $force = false) {
        $currentDate = clone $baseReservation->getDateStart();

        while(!$this->areSameDay($currentDate, (clone $baseReservation->getDateEnd())->add(new DateInterval('P1D')))) {
            if ($currentDate->format('N') <= 5 && !in_array($currentDate->format('Y-m-d'), $daysOff)) {
                $newReservation = clone $baseReservation;
                $newReservation->setDateStart((clone $currentDate)->setTime($startTime[0], $startTime[1], 0));
                $newReservation->setDateEnd((clone $currentDate)->setTime($endTime[0], $endTime[1], 0));

                if($this->areSameDay($currentDate, $firstReservation->getDateStart())) {
                    $newReservation->setDateStart($firstReservation->getDateStart());
                }
                if($this->areSameDay($currentDate, $firstReservation->getDateEnd())) {
                    //dump('sameday');
                    $newReservation->setDateEnd($firstReservation->getDateEnd());
                }

                $insideReservations = $this->containsReservations($alreadyReserved, $newReservation);
                if(count($insideReservations) == 0) {
                    //dump($newReservation, !$longProcess ? $baseReservation : null);
                    $this->addReservation($newReservation, !$longProcess ? $baseReservation : null);
                } else if(!$longProcess) {
                    $result = $this->deepFusionCheck($newReservation, $insideReservations);
                    $canPush = $result['success'];
                    //dump($result);
                    if(isset($result['fusionPossible']) && $result['fusionPossible'] && $fusion) $canPush = true;
                    if(isset($result['alertSize']) && $result['alertSize'] && $force) $canPush = true;
                    //dump($canPush);
                    if($canPush) {
                        // push
                        $this->addReservation($newReservation, $baseReservation);
                    } else return $result;
                }
            }
            $currentDate->add(new DateInterval('P1D'));
        }

        return ['success' => true];
    }

    private function addReservation(Reservation $reservation, Reservation $baseReservation = null) {

        if(!$reservation->getId()) {
            $this->entityManager->persist($reservation);
        } else if($baseReservation) {
            $baseReservation->setDateStart($reservation->getDateStart())
                ->setDateEnd($reservation->getDateEnd())
                ->setEvent($reservation->getEvent())
                ->setPromotion($reservation->getPromotion())
                ->setRoom($reservation->getRoom());
        }
    }

    public function areSameDay(DateTimeInterface $dateTime, DateTimeInterface $dateTime2) {
        return $dateTime->format('Y-m-d') == $dateTime2->format('Y-m-d');
    }

    private function deepFusionCheck(Reservation $baseReservation, array $insideReservations) {
        if(count($insideReservations) == 1) {
            $success = $baseReservation->getPromotion() && $insideReservations[0]->getPromotion() && $insideReservations[0]->getPromotion() == $baseReservation->getPromotion() ? false : true;
            $alertSize = ($baseReservation->getPromotion() ? $baseReservation->getPromotion()->getSize() : $baseReservation->getEvent()->getCapacity()) +
                ($insideReservations[0]->getPromotion() ? $insideReservations[0]->getPromotion()->getSize() : $insideReservations[0]->getEvent()->getCapacity())
                > $baseReservation->getRoom()->getCapacity();
            return [
                'success' => false,
                'fusionPossible' => $success,
                'alertSize' => $alertSize
            ];
        } else {
            return [
                'success' => false,
                'message' => "Plusieurs réservations prévues sur ce créneau"
            ];
            // deep Check
        }
    }
    /**
     * 0 => good
     * 1 => Fusion posible
     * 2 => Not posible
     * @param Reservation $reservation
     * @param int $capacity
     * @return array
     */
    public function checkReservation(Reservation $reservation, int $capacity) {
        $reservations = $this->entityManager->getRepository(Reservation::class)->getAllForTimeSlotInRoom($reservation)->getQuery()->getResult();
        if(count($reservations) == 0) return ['success' => true];
        else if(count($reservations) == 1) {
            $data['success'] = false;
            $resaCapacity = $reservations[0]->getPromotion() ? $reservations[0]->getPromotion()->getCapacity() : $reservations[0]->getEvent()->getCapacity();
            $tooMuch = ($capacity + $resaCapacity) > $reservation->getRoom()->getCapacity();
            if ($reservation->getPromotion() && $reservations[0]->getPromotion() && $reservations[0]->getPromotion()->getId() != $reservation->getPromotion()->getId()) {
                $data['fusionPosible'] = true;
                if (!$tooMuch) {
                    $data['forcePossible'] = true;
                }
            }
            return $data;
        } else return [ 'success' => false ];
    }

    private function isOver8Hours(Reservation $reservation) {
        return $reservation->getDateStart()->format('Y-m-d') != $reservation->getDateEnd()->format('Y-m-d');
        //return $dateDiff->y > 0 || $dateDiff->m > 0 || $dateDiff->d > 0 || $dateDiff->h > 8;
    }

    private function getArrayDaysOff(Reservation $reservation) {
        $daysOff = $this->closureDaysControllerHelper->getDaysOffBetween($reservation->getDateStart(), $reservation->getDateEnd());

        $arr = [];
        foreach ($daysOff as $day) {
            if(is_string($day)) {
                $arr[] = $day['date'];
            } else {
                $arr[] = $day['date']->format('Y-m-d');
            }
        }

        return $arr;
    }

    private function containsReservations(&$reservations, Reservation $baseReservation) {
        $insideReservations = [];
        foreach($reservations as $reservation) {
            if(($reservation->getDateStart() <= $baseReservation->getDateStart() && $reservation->getDateEnd() >= $baseReservation->getDateEnd())
                || $reservation->getDateStart() >= $baseReservation->getDateStart() && $reservation->getDateStart() <= $baseReservation->getDateEnd()
                || $reservation->getDateEnd() >= $baseReservation->getDateStart() && $reservation->getDateStart() <= $baseReservation->getDateEnd()) {
                $insideReservations[] = $reservation;
            }
        }

        return $insideReservations;
    }
}