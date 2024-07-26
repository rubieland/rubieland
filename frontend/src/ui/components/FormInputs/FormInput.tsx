import { ChangeEventHandler, FocusEventHandler } from 'react';

interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'password';
  name: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  isRequired = true,
  error,
  onBlur,
  onFocus,
}: FormInputProps) => {
  const classNames = error ? 'input input-error' : 'input';

  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input
        aria-label={!label ? placeholder : undefined}
        aria-invalid={!!error}
        aria-required={isRequired}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
        className={classNames}
        onBlur={() => onBlur}
        onFocus={() => onFocus}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default FormInput;
