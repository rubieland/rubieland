import { InputType } from '@/ui/components/FormInputs/ControlledFormInputs/ControlledTextInput';

type GetInputTypeFunctionType = (
  isPasswordVisible: boolean,
  type: InputType,
) => InputType;

/**
 * function to get the input type based on the password visibility and the original type
 * @param isPasswordVisible - boolean to determine if the password is visible
 * @param type - the original input type
 * @returns the input type
 *
 **/
export const getInputType: GetInputTypeFunctionType = (
  isPasswordVisible: boolean,
  type: InputType,
) => {
  if (type === 'password') {
    return isPasswordVisible ? 'text' : 'password';
  }
  return type;
};
