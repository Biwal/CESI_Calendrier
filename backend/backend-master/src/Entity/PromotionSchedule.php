<?php

namespace App\Entity;

use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"promoScheduler"}},
 *     denormalizationContext={"groups"={"promoScheduler"}})
 * @ORM\Entity(repositoryClass="App\Repository\PromotionScheduleRepository")
 */
class PromotionSchedule
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"promoScheduler","promotion"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"promoScheduler","promotion"})
     */
    private $dateStart;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"promoScheduler","promotion"})
     */
    private $dateEnd;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Promotion", inversedBy="promoSchedules")
     * @Groups({"promoScheduler"})
     */
    private $promotion;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?DateTimeInterface
    {
        return $this->dateStart;
    }

    public function setDateStart(DateTimeInterface $dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getDateEnd(): ?DateTimeInterface
    {
        return $this->dateEnd;
    }

    public function setDateEnd(DateTimeInterface $dateEnd): self
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    public function getPromotion(): ?Promotion
    {
        return $this->promotion;
    }

    public function setPromotion(?Promotion $promotion): self
    {
        $this->promotion = $promotion;

        return $this;
    }
}
