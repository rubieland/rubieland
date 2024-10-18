import { Controller, useFormContext } from 'react-hook-form';
import { SelectItem } from '../types/FormInputsTypes';
import Select from '../Select';

interface ControlledSelectProps {
  placeholder: SelectItem;
  isRequired?: boolean;
  withLabel?: boolean;
  items: SelectItem[];
  label: string;
  name: string;
}

const ControlledSelect = ({
  isRequired = false,
  placeholder,
  withLabel,
  label,
  items,
  name,
}: ControlledSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <Select
            placeholder={placeholder}
            onValueChange={onChange}
            isRequired={isRequired}
            isInvalid={!!error}
            items={items}
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

export default ControlledSelect;
