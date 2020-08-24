<?php

namespace App\Repository;

use App\Entity\Reservation;
use App\Entity\Room;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query\Expr\Join;

/**
 * @method Reservation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Reservation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Reservation[]    findAll()
 * @method Reservation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ReservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservation::class);
    }

    public function getEventOnRoom($room, DateTime $start, DateTime $stop)
    {
        $reservations = $this->getBaseQuery()
            ->where('r.dateStart >= :dateStart')
            ->andWhere('r.dateEnd <= :dateEnd')
            ->andWhere('r.room = :room')
            ->setParameter('dateStart', $start)
            ->setParameter('dateEnd', $stop)
            ->setParameter('room', $room)
            ->getQuery();
        $reservations = $reservations->getArrayResult();

        return $reservations;
    }

    public function getAllForTimeSlot(DateTime $start, DateTime $stop)
    {
        return $this->getBaseQuery()
            ->where('r.dateStart <= :dateStart AND r.dateEnd >= :dateStart')
            ->orWhere('r.dateStart >= :dateStart AND r.dateStart <= :dateEnd')
            ->setParameter('dateStart', $start)
            ->setParameter('dateEnd', $stop);
    }

    public function getAllForTimeSlotInRoom(Reservation $reservation)
    {
        $query = $this->getAllForTimeSlot($reservation->getDateStart(), $reservation->getDateEnd())
            ->andWhere('r.room = :room')
            ->setParameter('room', $reservation->getRoom());
        if($reservation->getId()) {
            $query->andWhere('r.id != :id')
            ->setParameter('id', $reservation->getId());
        }

        return $query;
    }

    public function getAllScheduledForTimeSlot(DateTime $start, DateTime $end)
    {
        return $this->getAllForTimeSlot($start, $end)
            ->addSelect('partial promoSchedules.{id, dateStart, dateEnd}')
            ->leftJoin('promotion.r', 'promoSchedules')->getQuery()->getScalarResult();
    }

    public function getAllForDay(DateTime $day)
    {
        $dateStart = clone $day->setTime(8, 00, 0);
        $dateEnd = clone $day->setTime(18, 00, 0);

        $bookings = $this->getBaseQuery()
            ->where('r.dateStart >= :dateStart')
            ->andWhere('r.dateEnd <= :dateEnd')
            ->setParameter('dateStart', $dateStart)
            ->setParameter('dateEnd', $dateEnd)
            ->getQuery();

        $bookings = $bookings->getArrayResult();
        $sortedBookings = [];
        foreach ($bookings as $index => $booking) {
            $roomName = $booking['room']['name'];
            if (!isset($sortedBookings[$roomName])) {
                $sortedBookings[$roomName] = [];
            }

            $sortedBookings[$roomName][] = $booking;
        }

        return $sortedBookings;
    }

    private function getBaseQuery() {
        return $this->createQueryBuilder("r")
            ->select('partial r.{id, dateStart, dateEnd}')
            ->addSelect('partial room.{id, name}')
            ->addSelect('partial event.{id, name, private, color}')
            ->addSelect('partial promotions.{id, name, size, active}')
            ->addSelect('partial pole.{id, name, color}')
            ->leftJoin('r.event', 'event')
            ->leftJoin('r.promotion', 'promotions')
            ->leftJoin('promotions.pole', 'pole')
            ->leftJoin('r.room', 'room');
    }
}
