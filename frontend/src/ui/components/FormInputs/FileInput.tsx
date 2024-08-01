import { ChangeEventHandler } from 'react';

interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  acceptedMimetypes: string;
  isRequired: boolean;
  isInvalid: boolean;
  multiple: boolean;
  label: string;
  name: string;
}

const FileInput = ({
  acceptedMimetypes,
  isRequired,
  isInvalid,
  multiple,
  onChange,
  label,
  name,
}: FileInputProps) => {
  const classNames = isInvalid
    ? 'input file-input input-error'
    : 'input file-input';

  return (
    <input
      accept={acceptedMimetypes}
      aria-required={isRequired}
      aria-invalid={isInvalid}
      className={classNames}
      required={isRequired}
      onChange={(e) => {
        onChange(e);
      }}
      multiple={multiple}
      aria-label={label}
      type="file"
      name={name}
      id={name}
    />
  );
};

export default FileInput;
