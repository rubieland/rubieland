import { Controller, useFormContext } from 'react-hook-form';
import { HTMLInputAutoCompleteAttribute } from 'react';
import DatePicker from '../DatePicker';

interface ControlledDatePickerProps {
  autocomplete?: HTMLInputAutoCompleteAttribute;
  maxDate?: string | number;
  minDate?: string | number;
  isRequired?: boolean;
  withLabel?: boolean;
  label: string;
  name: string;
}

const ControlledDatePicker = ({
  isRequired = true,
  withLabel = true,
  autocomplete,
  maxDate,
  minDate,
  label,
  name,
}: ControlledDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <DatePicker
            autocomplete={autocomplete}
            isRequired={isRequired}
            isInvalid={!!error}
            onChange={onChange}
            maxDate={maxDate}
            minDate={minDate}
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

export default ControlledDatePicker;
