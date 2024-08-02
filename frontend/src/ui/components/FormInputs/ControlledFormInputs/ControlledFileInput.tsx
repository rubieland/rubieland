import { Controller, useFormContext } from 'react-hook-form';
import { ChangeEvent, useRef, useState } from 'react';
import DefaultAvatar from '../../Icons/DefaultAvatar';
import Camera from '../../Icons/Camera';
import FileInput from '../FileInput';

interface ControlledFileInputProps {
  inputType: 'avatar' | 'blogArticlePicture';
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
  inputType,
  multiple = false,
  label,
  name,
}: ControlledFileInputProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { control } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    currentAvatar,
  );
  const classNames =
    inputType === 'avatar'
      ? `edit-avatar-input`
      : `form-input edit-blog-article-picture-input`;

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

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className={classNames} onClick={handleClick}>
          <FileInput
            onChange={(e) => handleChange(e, onChange)}
            acceptedMimetypes={acceptedMimetypes}
            isRequired={isRequired}
            isInvalid={!!error}
            ref={inputFileRef}
            multiple={multiple}
            label={label}
            name={name}
          />

          <figure className="edit-avatar-figure">
            {previewUrl && typeof previewUrl === 'string' ? (
              <img src={previewUrl} alt={label} />
            ) : (
              <DefaultAvatar color="#fff" />
            )}
            <figcaption className="edit-avatar-figcaption">
              <Camera color="#fff" />
              <p className="caption-text">Modifier</p>
            </figcaption>
          </figure>

          {error && (
            <span className="input-error-message">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledFileInput;
