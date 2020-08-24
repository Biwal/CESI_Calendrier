<?php

namespace App\Repository;

use App\Entity\ClosureDay;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ClosureDay|null find($id, $lockMode = null, $lockVersion = null)
 * @method ClosureDay|null findOneBy(array $criteria, array $orderBy = null)
 * @method ClosureDay[]    findAll()
 * @method ClosureDay[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ClosureDayRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ClosureDay::class);
    }

    public function getThisWeek(DateTime $first, DateTime $last) {
        return $this->createQueryBuilder('c')
            ->where('DATE(c.date) >= :first')
            ->andWhere('DATE(c.date) <= :last')
            ->setParameter('first', $first->format('Y-m-d'))
            ->setParameter('last', $last->format('Y-m-d'))
            ->getQuery()
            ->getArrayResult();
    }

    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
