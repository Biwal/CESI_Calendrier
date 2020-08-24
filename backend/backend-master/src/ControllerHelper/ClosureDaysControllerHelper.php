<?php


namespace App\ControllerHelper;


use App\Entity\ClosureDay;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;

class ClosureDaysControllerHelper
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getDaysOffBetween(DateTime $start, DateTime $end) {
        $daysOff = $this->entityManager->getRepository(ClosureDay::class)->getThisWeek($start, $end);

        $json = array_filter(json_decode(file_get_contents("https://jours-feries-france.antoine-augusti.fr/api/" . $start->format('Y')), true), function($day) use ($start, $end) {
            return new DateTime($day['date']) >= $start && new DateTime($day['date']) <= $end;
        });

        return array_merge($daysOff, $json);
    }
}