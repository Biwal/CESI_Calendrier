import { Promotion } from './promotion';
import { Pole } from './pole';
import { PromoScheduler } from './promo-scheduler';

describe('Promotion', () => {
  it('should create an instance', () => {
    expect(
      new Promotion({
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
    ).toBeTruthy();
  });
});
