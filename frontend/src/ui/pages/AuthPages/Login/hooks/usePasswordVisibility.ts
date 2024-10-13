import { useState } from 'react';

const usePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev);

  return {
    toggleConfirmPasswordVisibility,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    isPasswordVisible,
  };
};

export default usePasswordVisibility;
