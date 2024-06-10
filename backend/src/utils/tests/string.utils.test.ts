import { capitalize } from '../string.utils';

// TODO: add more tests
describe('capitalize', () => {
  it('should return the string with its first letter capitalized', () => {
    const str = 'hello';
    const expected = 'Hello';
    const result = capitalize(str);
    expect(result).toEqual(expected);
  });
});
