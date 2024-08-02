import { Controller, useFormContext } from 'react-hook-form';
import FileInput from '../FileInput';
import { ChangeEvent } from 'react';

interface ControlledFileInputProps {
  acceptedMimetypes: string;
  isRequired?: boolean;
  withLabel?: boolean;
  multiple?: boolean;
  label: string;
  name: string;
}

const ControlledFileInput = ({
  isRequired = false,
  acceptedMimetypes,
  withLabel = true,
  multiple = false,
  label,
  name,
}: ControlledFileInputProps) => {
  const { control } = useFormContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    onChange([selectedFile]);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className="form-input">
          {withLabel && <label htmlFor={name}>{label}</label>}
          <FileInput
            acceptedMimetypes={acceptedMimetypes}
            isRequired={isRequired}
            isInvalid={!!error}
            multiple={multiple}
            onChange={(e) => handleChange(e, onChange)}
            label={label}
            name={name}
          />

          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledFileInput;
