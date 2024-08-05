import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from '../Checkbox';

interface ControlledCheckboxProps {
  isRequired?: boolean;
  label: string;
  name: string;
}

const ControlledCheckbox = ({
  isRequired = false,
  label,
  name,
}: ControlledCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="checkbox-input">
          <label htmlFor={name}>{label}</label>
          <Checkbox
            onCheckChange={onChange}
            isRequired={isRequired}
            isInvalid={!!error}
            isChecked={value}
            value={value}
            label={label}
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

export default ControlledCheckbox;
