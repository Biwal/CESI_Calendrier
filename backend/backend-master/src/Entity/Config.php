<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ConfigRepository")
 */
class Config
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $defaultEventColor;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $hourStart;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $hourEnd;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDefaultEventColor(): ?string
    {
        return $this->defaultEventColor;
    }

    public function setDefaultEventColor(?string $defaultEventColor): self
    {
        $this->defaultEventColor = $defaultEventColor;

        return $this;
    }

    public function getHourStart(): ?string
    {
        return $this->hourStart;
    }

    public function setHourStart(?string $hourStart): self
    {
        $this->hourStart = $hourStart;

        return $this;
    }

    public function getHourEnd(): ?string
    {
        return $this->hourEnd;
    }

    public function setHourEnd(?string $hourEnd): self
    {
        $this->hourEnd = $hourEnd;

        return $this;
    }
}
