import { ChangeEventHandler, HTMLInputAutoCompleteAttribute } from 'react';
import classNames from 'classnames';

interface TextInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  type: 'text' | 'email' | 'password';
  value: string | number;
  placeholder?: string;
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  name: string;
}

const TextInput = ({
  autocomplete,
  placeholder,
  isRequired,
  isInvalid,
  onChange,
  label,
  value,
  type,
  name,
}: TextInputProps) => {
  const className = classNames('input', {
    'input-error': isInvalid,
  });

  return (
    <input
      autoComplete={autocomplete}
      aria-required={isRequired}
      placeholder={placeholder}
      aria-invalid={isInvalid}
      className={className}
      required={isRequired}
      onChange={onChange}
      aria-label={label}
      value={value}
      type={type}
      name={name}
      id={name}
    />
  );
};

export default TextInput;
