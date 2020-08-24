import { Reservation } from './reservation';
import { Room } from './room';

describe('Reservation', () => {
  it('should create an instance', () => {
    expect(
      new Reservation({
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
    ).toBeTruthy();
  });
});
