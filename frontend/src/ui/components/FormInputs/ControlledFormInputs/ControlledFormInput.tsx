import { Controller, useFormContext } from 'react-hook-form';
import FormInput from '../FormInput';

interface ControlledFormInputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  isRequired?: boolean;
  withLabel?: boolean;
  label: string;
  name: string;
}

const ControlledFormInput = ({
  withLabel = false,
  isRequired = true,
  type = 'text',
  placeholder,
  label,
  name,
}: ControlledFormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <FormInput
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

export default ControlledFormInput;
