import {
  forbiddenCharsRegex,
  addAsterisk,
  hasForbiddenChars,
} from '../string.utils';

describe('forbiddenCharsRegex', () => {
  it('should match forbidden characters', () => {
    const forbiddenChars = ['<', '>', '^', '~', '|', '\\', '{', '}'];
    forbiddenChars.forEach((char) => {
      expect(forbiddenCharsRegex.test(char)).toBe(true);
    });
  });

  it('should not match allowed characters', () => {
    const allowedChars = [
      'a',
      '1',
      ' ',
      '.',
      ',',
      '!',
      '@',
      '#',
      '$',
      '%',
      '&',
      '*',
      '(',
      ')',
      '-',
      '_',
      '=',
      '+',
      '[',
      ']',
      ';',
      ':',
      '"',
      "'",
      '?',
      '/',
      '`',
    ];
    allowedChars.forEach((char) => {
      expect(forbiddenCharsRegex.test(char)).toBe(false);
    });
  });
});

describe('addAsterisk', () => {
  it('should add an asterisk at the end of the text if there is not already one', () => {
    expect(addAsterisk('hello')).toBe('hello *');
  });

  it('should not add an asterisk if the text already ends with one', () => {
    expect(addAsterisk('hello *')).toBe('hello *');
  });

  it('should return the same text if it is empty', () => {
    expect(addAsterisk('')).toBe('');
  });
});

describe('hasForbiddenChars', () => {
  it('should return true if the string contains any forbidden characters', () => {
    expect(hasForbiddenChars('hello<')).toBe(true);
    expect(hasForbiddenChars('world>')).toBe(true);
    expect(hasForbiddenChars('foo^')).toBe(true);
    expect(hasForbiddenChars('bar~')).toBe(true);
    expect(hasForbiddenChars('baz|')).toBe(true);
    expect(hasForbiddenChars('qux\\')).toBe(true);
    expect(hasForbiddenChars('quux{')).toBe(true);
    expect(hasForbiddenChars('corge}')).toBe(true);
  });

  it('should return false if the string does not contain any forbidden characters', () => {
    expect(hasForbiddenChars('hello')).toBe(false);
    expect(hasForbiddenChars('world')).toBe(false);
    expect(hasForbiddenChars('foo')).toBe(false);
    expect(hasForbiddenChars('bar')).toBe(false);
    expect(hasForbiddenChars('baz')).toBe(false);
  });
});
