import { getInputType } from '../password.utils';

describe('getInputType', () => {
  it('should return "text" when isPasswordVisible is true and type is "password"', () => {
    const result = getInputType(true, 'password');
    expect(result).toBe('text');
  });

  it('should return "password" when isPasswordVisible is false and type is "password"', () => {
    const result = getInputType(false, 'password');
    expect(result).toBe('password');
  });

  it('should return the original type when type is not "password"', () => {
    const result = getInputType(true, 'text');
    expect(result).toBe('text');
  });

  it('should return the original type when type is not "password" and isPasswordVisible is false', () => {
    const result = getInputType(false, 'email');
    expect(result).toBe('email');
  });
});
