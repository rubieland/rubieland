import { SelectItem } from './types/FormInputsTypes';
import { ChangeEventHandler } from 'react';
import classNames from 'classnames';

interface SelectProps {
  onValueChange: ChangeEventHandler<HTMLSelectElement>;
  placeholder: SelectItem;
  value: string | number;
  items: SelectItem[];
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  name: string;
}

const Select = ({
  onValueChange,
  placeholder,
  isRequired,
  isInvalid,
  items,
  value,
  name,
}: SelectProps) => {
  const className = classNames('select', {
    'input-error': isInvalid,
  });

  return (
    <select
      aria-required={isRequired}
      onChange={onValueChange}
      aria-invalid={isInvalid}
      className={className}
      required={isRequired}
      value={value}
      name={name}
      id={name}
    >
      <>
        <option disabled aria-disabled value={placeholder.value}>
          {placeholder.label}
        </option>
        {items.map((item, i) => (
          <option value={item.value} key={i}>
            {item.label}
          </option>
        ))}
      </>
    </select>
  );
};

export default Select;
