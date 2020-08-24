<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"promotion"}},
 *     denormalizationContext={"groups"={"promotion"}})
 * @ORM\Entity(repositoryClass="App\Repository\PromotionRepository")
 */

class Promotion
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"promotion", "pole", "reservation","promoScheduler"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"promotion", "pole", "reservation","promoScheduler"})
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"promotion", "pole", "reservation","promoScheduler"})
     */
    private $size;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"promotion", "pole", "reservation","promoScheduler"})
     */
    private $active;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pole", inversedBy="promotions")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"promotion", "reservation","promoScheduler"})
     */
    private $pole;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PromotionSchedule", mappedBy="promotion", cascade={"persist", "remove"}, orphanRemoval=true)
     * @Groups({"promotion", "pole","reservation"})
     */
    private $promoSchedules;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Reservation", inversedBy="promotions")
     * @Groups({"promotion", "pole","promoScheduler"})
     */
    private $reservations;

    /**
     * @ORM\Column(type="string", length=5, nullable=true)
     */
    private $defaultTimeStart;

    /**
     * @ORM\Column(type="string", length=5, nullable=true)
     */
    private $defaultTimeEnd;

    public function __construct()
    {
        $this->promoSchedules = new ArrayCollection();
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getPole(): ?Pole
    {
        return $this->pole;
    }

    public function setPole(?Pole $pole): self
    {
        $this->pole = $pole;

        return $this;
    }

    /**
     * @return Collection|PromotionSchedule[]
     */
    public function getPromoSchedules(): Collection
    {
        return $this->promoSchedules;
    }

    public function addPromoSchedule(PromotionSchedule $promoSchedule): self
    {
        if (!$this->promoSchedules->contains($promoSchedule)) {
            $this->promoSchedules[] = $promoSchedule;
            $promoSchedule->setPromotion($this);
        }

        return $this;
    }

    public function removePromoSchedule(PromotionSchedule $promoSchedule): self
    {
        if ($this->promoSchedules->contains($promoSchedule)) {
            $this->promoSchedules->removeElement($promoSchedule);
            // set the owning side to null (unless already changed)
            if ($promoSchedule->getPromotion() === $this) {
                $promoSchedule->setPromotion(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Reservation[]
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations[] = $reservation;
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservations->contains($reservation)) {
            $this->reservations->removeElement($reservation);
        }

        return $this;
    }

    public function getDefaultTimeStart(): ?string
    {
        return $this->defaultTimeStart;
    }

    public function setDefaultTimeStart(?string $defaultTimeStart): self
    {
        $this->defaultTimeStart = $defaultTimeStart;

        return $this;
    }

    public function getDefaultTimeEnd(): ?string
    {
        return $this->defaultTimeEnd;
    }

    public function setDefaultTimeEnd(string $defaultTimeEnd): self
    {
        $this->defaultTimeEnd = $defaultTimeEnd;

        return $this;
    }
}
