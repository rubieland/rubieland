import { Controller, useFormContext } from 'react-hook-form';
import TextInput from '../TextInput';

interface ControlledTextInputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  isRequired?: boolean;
  withLabel?: boolean;
  label: string;
  name: string;
}

const ControlledTextInput = ({
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
