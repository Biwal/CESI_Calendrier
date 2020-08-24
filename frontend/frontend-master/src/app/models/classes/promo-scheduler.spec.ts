import { PromoScheduler } from './promo-scheduler';
import { Promotion } from './promotion';
import { Pole } from './pole';

describe('PromoScheduler', () => {
  it('should create an instance', () => {
    expect(
      new PromoScheduler({
        dateStart: new Date(),
        dateEnd: new Date(),
        promotion: new Promotion({
          id: 3,
          name: 'AP18',
          size: 5,
          isActive: true,
          pole: new Pole({
            id: 4,
            name: 'informatique',
            color: '#ffb81c'
          }),
          promoSchedules: new Array<PromoScheduler>()
        })
      })
    ).toBeTruthy();
  });
});
