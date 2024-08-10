import { useModalStoreActions } from '../../../../stores/ModalStore';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CropPictureModal from '../../Modal/CropPictureModal';
import EditPictureFileInput from '../EditPictureFileInput';
import FileInput from '../FileInput';

/**
 * TODO:
 * - fix crop ellipse shape instead of circle on first load
 * - refactor: click on avatar should not directly open file browser but
 * should open a modal with both the file input AND the <Cropper />
 * - implement the real "crop" logic to edit the avatar with the new cropped img
 * - the cancel btn should remove the selected file before closing the modal
 */

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
  const { openModal } = useModalStoreActions();
  const cropPictureModalRef = useRef<HTMLDialogElement | null>(null);

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

  useEffect(() => {
    if (imgSrc) openModal('cropPictureModal');
  }, [imgSrc]);

  return (
    <>
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
      <CropPictureModal
        modalRef={cropPictureModalRef}
        pictureType="avatar"
        imgSrc={imgSrc}
      />
    </>
  );
};

export default ControlledFileInput;
