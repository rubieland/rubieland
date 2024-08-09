import { Controller, useFormContext } from 'react-hook-form';
import EditPictureFileInput from '../EditPictureFileInput';
import { ChangeEvent, useRef, useState } from 'react';
import FileInput from '../FileInput';

interface ControlledFileInputProps {
  pictureType: 'avatar' | 'articlePicture';
  acceptedMimetypes: string;
  currentAvatar?: string;
  isRequired?: boolean;
  multiple?: boolean;
  label: string;
  name: string;
}

const ControlledFileInput = ({
  currentAvatar = '',
  isRequired = false,
  acceptedMimetypes,
  multiple = false,
  pictureType,
  label,
  name,
}: ControlledFileInputProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { control } = useFormContext();
  const [imgSrc, setImgSrc] = useState<string>(currentAvatar);

  const className =
    pictureType === 'avatar'
      ? `edit-avatar-input`
      : `edit-article-picture-input`;

  const onSelectFile = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
    onChange([file]);
  };

  const handleClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
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
              onChange={(e) => onSelectFile(e, onChange)}
              acceptedMimetypes={acceptedMimetypes}
              isRequired={isRequired}
              isInvalid={!!error}
              multiple={multiple}
              ref={inputFileRef}
              label={label}
              name={name}
            />

            <EditPictureFileInput
              pictureType={pictureType}
              imgSrc={imgSrc}
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
