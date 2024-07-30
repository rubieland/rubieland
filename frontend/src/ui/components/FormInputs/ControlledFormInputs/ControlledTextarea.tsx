import { Controller, useFormContext } from 'react-hook-form';
import Textarea from '../Textarea';

interface ControlledTextareaProps {
  placeholder?: string;
  isRequired?: boolean;
  withLabel?: boolean;
  label: string;
  name: string;
  cols?: number;
  rows?: number;
}

const ControlledTextarea = ({
  isRequired = true,
  withLabel = false,
  label,
  placeholder = label,
  name,
  cols = 33,
  rows = 10,
}: ControlledTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <Textarea
            placeholder={placeholder}
            isRequired={isRequired}
            isInvalid={!!error}
            onChange={onChange}
            value={value}
            label={label}
            name={name}
            cols={cols}
            rows={rows}
          />
          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledTextarea;
