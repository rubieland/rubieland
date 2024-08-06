import classNames from 'classnames';
import { ChangeEventHandler } from 'react';

interface CheckboxProps {
  onCheckChange: ChangeEventHandler<HTMLInputElement>;
  isRequired?: boolean;
  isInvalid?: boolean;
  isChecked: boolean;
  value: string;
  label: string;
  name: string;
}

const Checkbox = ({
  isChecked = false,
  onCheckChange,
  isRequired,
  isInvalid,
  value,
  label,
  name,
}: CheckboxProps) => {
  const className = classNames('checkbox', {
    'checkbox input-error': isInvalid,
  });

  return (
    <input
      aria-required={isRequired}
      aria-invalid={isInvalid}
      onChange={onCheckChange}
      className={className}
      required={isRequired}
      checked={isChecked}
      aria-label={label}
      type="checkbox"
      value={value}
      name={name}
      id={name}
    />
  );
};

export default Checkbox;
