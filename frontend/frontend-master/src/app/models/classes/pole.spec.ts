import { Pole } from './pole';

describe('Pole', () => {
  it('should create an instance', () => {
    expect(new Pole({id:4,name:'informatique', color:'#ffb81c'})).toBeTruthy();
  });
});
