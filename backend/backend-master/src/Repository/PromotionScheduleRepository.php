<?php

namespace App\Repository;

use App\Entity\Promotion;
use App\Entity\PromotionSchedule;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Query;

/**
 * @method PromotionSchedule|null find($id, $lockMode = null, $lockVersion = null)
 * @method PromotionSchedule|null findOneBy(array $criteria, array $orderBy = null)
 * @method PromotionSchedule[]    findAll()
 * @method PromotionSchedule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PromotionScheduleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PromotionSchedule::class);
    }

    /**
     * @param Promotion $promotion
     * @param DateTime $start
     * @param DateTime $end
     * @return Query
     */
    public function findByPromotionAndSlot(Promotion $promotion, DateTime $start, DateTime $end)
    {
        return $this->createQueryBuilder("ps")
            ->select('partial ps.{id, dateStart, dateEnd}')
            ->leftJoin('ps.promotion', 'promotion')
            ->leftJoin('promotion.pole', 'pole')
            ->where('(ps.dateStart < :dateStart AND ps.dateEnd > :dateStart) OR (ps.dateStart > :dateStart AND ps.dateStart < :dateEnd)')
            ->andWhere('promotion = :promotion')
            ->setParameter('dateStart', $start)
            ->setParameter('dateEnd', $end)
            ->setParameter('promotion', $promotion)
            ->getQuery();
    }
}
