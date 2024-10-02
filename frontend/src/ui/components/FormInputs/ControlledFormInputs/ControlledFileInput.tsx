import { Controller, useFormContext } from 'react-hook-form';
import EditPictureFileInput from '../EditPictureFileInput';
import { ChangeEvent, useRef, useState } from 'react';
import FileInput from '../FileInput';

interface ControlledFileInputProps {
  pictureType: 'avatar' | 'postPicture';
  currentAvatar?: string | null;
  acceptedMimetypes: string;
  isRequired?: boolean;
  multiple?: boolean;
  label: string;
  name: string;
}

const ControlledFileInput = ({
  currentAvatar = null,
  isRequired = false,
  acceptedMimetypes,
  multiple = false,
  pictureType,
  label,
  name,
}: ControlledFileInputProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { control } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    currentAvatar,
  );

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
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
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
              acceptedMimetypes={acceptedMimetypes}
              isRequired={isRequired}
              isInvalid={!!error}
              multiple={multiple}
              ref={inputFileRef}
              label={label}
              name={name}
            />

            <EditPictureFileInput
              previewUrl={previewUrl}
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
