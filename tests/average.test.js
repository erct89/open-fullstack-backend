import { average } from '../src/utils/forTesting';

describe('Suite averate test', () => {

  test('average to one value itselt', () => {
    const result = average(10);

    expect(result).toBe(10);
  });

  test('average of many calculated right', () => {
    const result = average(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    expect(result).toBe(5.5);
  });

  test('average of empty params is zero', () => {
    const result = average();

    expect(result).toBe(0);
  });

});
