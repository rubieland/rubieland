import { ChangeEventHandler, forwardRef } from 'react';
import classNames from 'classnames';

interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  acceptedMimetypes: string;
  isRequired: boolean;
  isInvalid: boolean;
  multiple: boolean;
  label: string;
  name: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      acceptedMimetypes,
      isRequired,
      isInvalid,
      multiple,
      onChange,
      label,
      name,
    },
    ref,
  ) => {
    const className = classNames('input file-input', {
      'input-error': isInvalid,
    });

    return (
      <input
        accept={acceptedMimetypes}
        aria-required={isRequired}
        aria-invalid={isInvalid}
        className={className}
        required={isRequired}
        onChange={onChange}
        multiple={multiple}
        aria-label={label}
        type="file"
        name={name}
        ref={ref}
        id={name}
      />
    );
  },
);

export default FileInput;
