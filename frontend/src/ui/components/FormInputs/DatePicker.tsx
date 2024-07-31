import { ChangeEventHandler } from 'react';

interface DatePickerProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  maxDate?: string | number;
  minDate?: string | number;
  value: string | number;
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  name: string;
}

const DatePicker = ({
  isRequired,
  isInvalid,
  onChange,
  maxDate,
  minDate,
  value,
  label,
  name,
}: DatePickerProps) => {
  const classNames = isInvalid
    ? 'input date-input input-error'
    : 'input date-input';

  return (
    <input
      aria-required={isRequired}
      aria-invalid={isInvalid}
      className={classNames}
      required={isRequired}
      onChange={onChange}
      aria-label={label}
      autoComplete="on"
      value={value}
      max={maxDate}
      min={minDate}
      type="date"
      name={name}
      id={name}
    />
  );
};

export default DatePicker;
