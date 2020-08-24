import { Promotion } from './promotion';

export class Pole {
  private id: number;
  private name: string;
  private color: string;
  private promotions: Array<Promotion> = [];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.promotions = data.promotions;
  }

  public get getId(): number {
    return this.id;
  }

  public setId(v: number) {
    this.id = v;
  }

  public get getName(): string {
    return this.name;
  }

  public setName(v: string) {
    this.name = v;
  }

  public get getColor(): string {
    return this.color;
  }

  public setColor(v: string) {
    this.color = v;
  }

  public get getPromotions(): Array<Promotion> {
    return this.promotions;
  }

  public setPromotions(v: Array<Promotion>) {
    this.promotions = v;
  }

  addPromotion(v: Promotion) {
    if (!this.promotions.includes(v)) {
      this.promotions.push(v);
    }
    return this.promotions;
  }

  removePromotion(v: Promotion) {
    if (this.promotions.includes(v)) {
      const index = this.promotions.indexOf(v);
      this.promotions.splice(index, 1);
    }
    return this.promotions;
  }
}
