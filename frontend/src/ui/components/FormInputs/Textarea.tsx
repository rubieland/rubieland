import { ChangeEventHandler, FocusEventHandler } from 'react';

interface TextareaProps {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  value: string;
  label: string;
  name: string;
  cols?: number;
  rows?: number;
}

const Textarea = ({
  isRequired = true,
  placeholder,
  isInvalid,
  onChange,
  onFocus,
  onBlur,
  label,
  value,
  name,
  cols,
  rows,
}: TextareaProps) => {
  const classNames = isInvalid ? 'textarea input-error' : 'textarea';

  return (
    <textarea
      aria-required={isRequired}
      placeholder={placeholder}
      aria-invalid={isInvalid}
      onFocus={() => onFocus}
      className={classNames}
      required={isRequired}
      onBlur={() => onBlur}
      onChange={onChange}
      aria-label={label}
      name={name}
      cols={cols}
      rows={rows}
    >
      {value}
    </textarea>
  );
};

export default Textarea;
