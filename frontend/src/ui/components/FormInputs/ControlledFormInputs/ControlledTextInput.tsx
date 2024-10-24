import { Controller, useFormContext } from 'react-hook-form';
import { HTMLInputAutoCompleteAttribute } from 'react';
import { getInputType } from '@/utils/password.utils';
import colors from '@/assets/styles/colors';
import EyeSlash from '../../Icons/EyeSlash';
import TextInput from '../TextInput';
import Eye from '../../Icons/Eye';

export type InputType = 'text' | 'email' | 'password';

interface ControlledTextInputProps {
  autocomplete?: HTMLInputAutoCompleteAttribute;
  togglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  withLabel?: boolean;
  type?: InputType;
  label: string;
  name: string;
}

const ControlledTextInput = ({
  isPasswordVisible = false,
  togglePasswordVisibility,
  autocomplete = 'on',
  withLabel = false,
  isRequired = true,
  type = 'text',
  placeholder,
  label,
  name,
}: ControlledTextInputProps) => {
  const { control } = useFormContext();
  const inputType = getInputType(isPasswordVisible, type);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <TextInput
            autocomplete={autocomplete}
            placeholder={placeholder || label}
            isRequired={isRequired}
            isInvalid={!!error}
            onChange={onChange}
            type={inputType}
            value={value}
            label={label}
            name={name}
          />
          {type !== 'password' ? null : (
            <span className="input-icon" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <EyeSlash width={24} height={24} stroke={colors.grey60} />
              ) : (
                <Eye width={24} height={24} stroke={colors.grey60} />
              )}
            </span>
          )}
          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTextInput;
