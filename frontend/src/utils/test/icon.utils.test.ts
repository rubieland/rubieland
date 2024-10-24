import { getAdaptableSize } from '../icon.utils';

describe('getAdaptableSize', () => {
  it('should return undefined for height and width if originalWidth is less than or equal to 0', () => {
    const result = getAdaptableSize({
      currentWidth: 100,
      originalHeight: 50,
      originalWidth: 0,
    });
    expect(result).toEqual({ h: undefined, w: undefined });
  });

  it('should return the original size if currentWidth is undefined', () => {
    const result = getAdaptableSize({
      currentWidth: undefined,
      originalHeight: 50,
      originalWidth: 100,
    });
    expect(result).toEqual({ h: 50, w: 100 });
  });

  it('should return the adapted size based on the currentWidth', () => {
    const result = getAdaptableSize({
      currentWidth: 200,
      originalHeight: 50,
      originalWidth: 100,
    });
    expect(result).toEqual({ h: 100, w: 200 });
  });

  it('should handle floating point numbers correctly', () => {
    const result = getAdaptableSize({
      currentWidth: 150.5,
      originalHeight: 75.25,
      originalWidth: 100.5,
    });
    expect(result).toEqual({ h: 112.69, w: 150.5 });
  });

  it('should handle zero currentWidth correctly', () => {
    const result = getAdaptableSize({
      currentWidth: 0,
      originalHeight: 50,
      originalWidth: 100,
    });
    expect(result).toEqual({ h: 50, w: 100 });
  });
});
