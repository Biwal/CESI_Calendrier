import { Reservation } from './reservation';

export class Event {
  private id: number;
  private name: string;
  private capacity: number;
  private private: boolean;
  private reservation: Reservation;
  private color?: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.capacity = data.capacity;
    this.private = data.private;
    this.reservation = data.reservation;
    this.color = data.color;
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

  public get getCapacity(): number {
    return this.capacity;
  }

  public setCapacity(v: number) {
    this.capacity = v;
  }

  public get getPrivate(): boolean {
    return this.private;
  }

  public setColor(c?: string) {
    this.color = c;
  }

  public get getColor(): string {
    return this.color;
  }

  public setPrivate(v: boolean) {
    this.private = v;
  }

  public get getReservation(): Reservation {
    return this.reservation;
  }

  public setReservation(v: Reservation) {
    this.reservation = v;
  }
}
