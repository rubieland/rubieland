import { acceptedMimeTypesString } from '@/core/fileUploadConfig';
import { Controller, useFormContext } from 'react-hook-form';
import EditPictureFileInput from '../EditPictureFileInput';
import { ChangeEvent, useRef } from 'react';
import FileInput from '../FileInput';

interface ControlledFileInputProps {
  pictureType: 'avatar' | 'postPicture';
  currentImage?: string | null;
  isRequired?: boolean;
  multiple?: boolean;
  label: string;
  name: string;
}

const ControlledFileInput = ({
  currentImage = null,
  isRequired = false,
  multiple = false,
  pictureType,
  label,
  name,
}: ControlledFileInputProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { control, getValues } = useFormContext();

  const pictureFile: File | null = getValues(name) ? getValues(name)[0] : null;

  const className =
    pictureType === 'avatar' ? `edit-avatar-input` : `edit-post-picture-input`;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const selectedFile = target.files[0];

    if (selectedFile) {
      onChange([selectedFile]);
    }
  };

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') e.preventDefault();
    else if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className={`${className}-container`}>
          <div
            onKeyDown={handleKeyDown}
            className={className}
            onClick={handleClick}
            role="button"
            tabIndex={0}
          >
            <FileInput
              onChange={(e) => handleChange(e, onChange)}
              acceptedMimetypes={acceptedMimeTypesString}
              isRequired={isRequired}
              isInvalid={!!error}
              multiple={multiple}
              ref={inputFileRef}
              label={label}
              name={name}
            />
            <EditPictureFileInput
              pictureFile={currentImage ?? pictureFile}
              pictureType={pictureType}
              label={label}
            />
          </div>
          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledFileInput;
