import { Event } from './event';
import { Reservation } from './reservation';
import { Room } from './room';

describe('Event', () => {
  it('should create an instance', () => {
    expect(
      new Event({
        id: 65,
        name: 'Orion',
        capacity: 15,
        isPrivate: false,
        reservation: new Reservation({
          dateStart: new Date(),
          dateEnd: new Date(),
          room: new Room({
            id: 1,
            name: 'Westeros',
            capacity: 18,
            reservations: new Array<Reservation>()
          }),
          id: 6
        })
      })
    ).toBeTruthy();
  });
});
