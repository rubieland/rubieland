import { ChangeEventHandler, FocusEventHandler } from 'react';

interface FormInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  type?: 'text' | 'email' | 'password';
  value: string | number;
  placeholder?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  label: string;
  name: string;
}

const FormInput = ({
  isRequired = true,
  type = 'text',
  placeholder,
  isInvalid,
  onChange,
  onFocus,
  onBlur,
  label,
  value,
  name,
}: FormInputProps) => {
  const classNames = isInvalid ? 'input input-error' : 'input';

  return (
    <input
      aria-required={isRequired}
      placeholder={placeholder}
      aria-invalid={isInvalid}
      onFocus={() => onFocus}
      className={classNames}
      required={isRequired}
      onBlur={() => onBlur}
      onChange={onChange}
      aria-label={label}
      value={value}
      type={type}
      name={name}
    />
  );
};

export default FormInput;
