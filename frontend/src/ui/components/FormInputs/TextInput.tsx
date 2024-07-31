import { ChangeEventHandler } from 'react';

interface TextInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: 'text' | 'email' | 'password';
  value: string | number;
  placeholder?: string;
  isRequired: boolean;
  isInvalid: boolean;
  label: string;
  name: string;
}

const TextInput = ({
  placeholder,
  isRequired,
  isInvalid,
  onChange,
  label,
  value,
  type,
  name,
}: TextInputProps) => {
  const classNames = isInvalid ? 'input input-error' : 'input';

  return (
    <input
      aria-required={isRequired}
      placeholder={placeholder}
      aria-invalid={isInvalid}
      className={classNames}
      required={isRequired}
      onChange={onChange}
      aria-label={label}
      autoComplete="on"
      value={value}
      type={type}
      name={name}
      id={name}
    />
  );
};

export default TextInput;
