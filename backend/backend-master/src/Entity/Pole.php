<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"pole"}},
 *     denormalizationContext={"groups"={"pole"}})
 * @ORM\Entity(repositoryClass="App\Repository\PoleRepository")
 */
class Pole
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"promotion", "pole", "reservation"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"promotion", "pole","reservation"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"promotion", "pole","reservation"})
     */
    private $color;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Promotion", mappedBy="pole")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"pole"})
     */
    private $promotions;

    public function __construct()
    {
        $this->promotions = new ArrayCollection();
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

    /**
     * @return Collection|Promotion[]
     */
    public function getPromotions(): Collection
    {
        return $this->promotions;
    }

    public function addPromotion(Promotion $promotion): self
    {
        if (!$this->promotions->contains($promotion)) {
            $this->promotions[] = $promotion;
            $promotion->setPole($this);
        }

        return $this;
    }

    public function removePromotion(Promotion $promotion): self
    {
        if ($this->promotions->contains($promotion)) {
            $this->promotions->removeElement($promotion);
            // set the owning side to null (unless already changed)
            if ($promotion->getPole() === $this) {
                $promotion->setPole(null);
            }
        }

        return $this;
    }

    /**
     * @return mixed
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param mixed $color
     * @return Pole
     */
    public function setColor($color): self
    {
        $this->color = $color;

        return $this;
    }
}
