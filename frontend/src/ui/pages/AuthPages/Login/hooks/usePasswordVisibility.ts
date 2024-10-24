import { useState } from 'react';

const usePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible((prev) => !prev);
  const toggleNewPasswordVisibility = () =>
    setIsNewPasswordVisible((prev) => !prev);

  return {
    toggleConfirmPasswordVisibility,
    toggleNewPasswordVisibility,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    isNewPasswordVisible,
    isPasswordVisible,
  };
};

export default usePasswordVisibility;
