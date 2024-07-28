import { FieldError } from 'react-hook-form';

export const shouldRenderPasswordIcon = (
  type: string | undefined,
  error?: FieldError,
): boolean => {
  return type === 'password' && !error;
};
