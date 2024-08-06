import classNames from 'classnames';
import { ChangeEventHandler, FocusEvent } from 'react';

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
  const className = classNames('input date-picker', {
    'input-error': isInvalid,
  });

  const showPicker = (e: FocusEvent<HTMLInputElement>) => {
    e.target.showPicker();
  };

  return (
    <input
      aria-required={isRequired}
      aria-invalid={isInvalid}
      className={className}
      required={isRequired}
      onFocus={showPicker}
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
