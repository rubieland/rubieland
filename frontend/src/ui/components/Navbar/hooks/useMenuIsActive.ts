import { useState } from 'react';

export const useMenuIsActive = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive((prev) => !prev);
  };

  const removeIsActive = () => {
    setIsActive(false);
  };

  return {
    toggleIsActive,
    removeIsActive,
    setIsActive,
    isActive,
  };
};
