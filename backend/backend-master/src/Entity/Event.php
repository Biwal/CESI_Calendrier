<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"event"}},
 *     denormalizationContext={"groups"={"event"}})
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"event", "reservation"})
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"event", "reservation"})
     */
    private $capacity;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"event", "reservation"})
     */
    private $name;

    /**
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"event", "reservation"})
     */
    private $private;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Reservation")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"event"})
     */
    private $reservation;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"event", "reservation"})
     */
    private $color;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): self
    {
        $this->capacity = $capacity;

        return $this;
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

    public function getReservation(): ?Reservation
    {
        return $this->reservation;
    }

    public function setReservation(?Reservation $reservation): self
    {
        $this->reservation = $reservation;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPrivate()
    {
        return $this->private;
    }

    /**
     * @param mixed $private
     * @return Event
     */
    public function setPrivate($private): self
    {
        $this->private = $private;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }
}
