import { useEffect, useState } from 'react';

// this hook tracks the window vertical scroll and returns the scroll Y value
// which is useful to add styles, animations or elements (like a scroll-to-top button)
export const useScrollYPosition = () => {
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollYPosition(window.scrollY);
    };
    window.addEventListener('scroll', updatePosition);

    updatePosition();

    return () => window.addEventListener('scroll', updatePosition);
  }, []);

  return scrollYPosition;
};
