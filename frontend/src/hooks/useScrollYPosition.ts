import { useState, useEffect } from 'react';

type UseScrollPositionType = (threshold?: number) => number;

const useScrollPosition: UseScrollPositionType = (threshold = 40) => {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

  useEffect(() => {
    let lastKnownScrollY: number = window.scrollY;

    const handleScroll = () => {
      const currentScrollY: number = window.scrollY;
      if (Math.abs(currentScrollY - lastKnownScrollY) > threshold) {
        setScrollY(currentScrollY);
        lastKnownScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollY;
};

export default useScrollPosition;
