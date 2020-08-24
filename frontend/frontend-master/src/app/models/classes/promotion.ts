import { Pole } from './pole';
import { PromoScheduler } from './promo-scheduler';
import { Reservation } from './reservation';

export class Promotion {
  private id: number;
  private name: string;
  private size: number;
  private active: boolean;
  private pole: Pole;
  private promoSchedules: PromoScheduler[] = [];
  private reservations: Reservation[] = [];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.size = data.size;
    this.active = data.active;
    this.pole = data.pole;
    this.promoSchedules = data.promoSchedules;
    this.reservations = data.reservations;
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

  public get getSize(): number {
    return this.size;
  }

  public setSize(v: number) {
    this.size = v;
  }

  public get getActive(): boolean {
    return this.active;
  }

  public setActive(v: boolean) {
    this.active = v;
  }

  public get getPole(): Pole {
    return this.pole;
  }

  public setPole(v: Pole) {
    this.pole = v;
  }

  public get getPromoSchedules(): Array<PromoScheduler> {
    return this.promoSchedules;
  }

  public setPromoSchedules(v: Array<PromoScheduler>) {
    this.promoSchedules = v;
  }

  addPromoScheduler(v: PromoScheduler) {
    if (!this.promoSchedules.includes(v)) {
      this.promoSchedules.push(v);
    }
    return this.promoSchedules;
  }

  removePromoScheduler(v: PromoScheduler) {
    if (this.promoSchedules.includes(v)) {
      const index = this.promoSchedules.indexOf(v);
      this.promoSchedules.splice(index, 1);
    }
    return this.promoSchedules;
  }

  public get getReservations(): Array<Reservation> {
    return this.reservations;
  }

  setReservations(v: Array<Reservation>) {
    this.reservations = v;
  }

  addReservation(v: Reservation) {
    if (!this.reservations.includes(v)) {
      this.reservations.push(v);
    }
    return this.reservations;
  }

  removeReservation(v: Reservation) {
    if (this.reservations.includes(v)) {
      const index = this.reservations.indexOf(v);
      this.reservations.splice(index, 1);
    }
    return this.reservations;
  }
}
