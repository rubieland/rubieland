import { acceptedMimeTypesString } from '@/core/fileUploadConfig';
import { Controller, useFormContext } from 'react-hook-form';
import EditPictureFileInput from '../EditPictureFileInput';
import { ChangeEvent, useRef, useState } from 'react';
import FileInput from '../FileInput';

interface ControlledFileInputProps {
  pictureType: 'avatar' | 'postPicture';
  existingImage?: string | null;
  isRequired?: boolean;
  multiple?: boolean;
  label: string;
  name: string;
}

const ControlledFileInput = ({
  existingImage = null,
  isRequired = false,
  multiple = false,
  pictureType,
  label,
  name,
}: ControlledFileInputProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { control, getValues } = useFormContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // imageSource is the image that will be displayed in the input
  // it can be a File if the user has uploaded a file using the input,
  // a string if the image already exists in backend
  // or null if there is no image
  const imageSource: File | string | null =
    selectedFile || existingImage || (getValues(name) && getValues(name)[0]);

  const className =
    pictureType === 'avatar' ? `edit-avatar-input` : `edit-post-picture-input`;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    // get the file from the input
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    // get the first file from the file list
    const file = target.files[0];

    // if the user has selected a file, set it as the selected file
    if (file) {
      setSelectedFile(file);
      onChange([file]);
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
              imageSource={imageSource}
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
