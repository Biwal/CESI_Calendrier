import { Reservation } from './reservation';

export class Room {
  private id: number;
  private name: string;
  private capacity: number;
  private reservations: Reservation[] = [];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.capacity = data.capacity;
    this.reservations = data.reservations;
  }

  public get getId(): number {
    return this.id;
  }

  setId(v: number) {
    this.id = v;
  }

  public get getName() {
    return this.name;
  }

  setName(v: string) {
    this.name = v;
  }

  public get getCapacity(): number {
    return this.capacity;
  }

  setCapacity(v: number) {
    this.capacity = v;
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
