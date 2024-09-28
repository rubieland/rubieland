import { Controller, useFormContext } from 'react-hook-form';
import { HTMLInputAutoCompleteAttribute } from 'react';
import TextInput from '../TextInput';

interface ControlledTextInputProps {
  autocomplete?: HTMLInputAutoCompleteAttribute;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  isRequired?: boolean;
  withLabel?: boolean;
  label: string;
  name: string;
}

const ControlledTextInput = ({
  autocomplete = 'on',
  withLabel = false,
  isRequired = true,
  type = 'text',
  placeholder,
  label,
  name,
}: ControlledTextInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <TextInput
            autocomplete={autocomplete}
            placeholder={placeholder}
            isRequired={isRequired}
            isInvalid={!!error}
            onChange={onChange}
            value={value}
            label={label}
            type={type}
            name={name}
          />
          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTextInput;
