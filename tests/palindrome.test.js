import { palindrome } from '../src/utils/forTesting';

describe('Suite palindrome', () => {

  test('palindrome of a', () => {
    const result = palindrome('a');

    expect(result).toBe('a');
  });

  test('palindrome of react', () => {
    const result = palindrome('react');

    expect(result).toBe('tcaer');
  });

  test('palindrome of releveler', () => {
    const result = palindrome('releveler');

    expect(result).toBe('releveler');
  });

});
