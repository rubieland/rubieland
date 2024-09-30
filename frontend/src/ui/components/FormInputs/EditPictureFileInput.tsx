import EditPostPictureInput from './EditPostPictureInput';
import EditAvatarInput from './EditAvatarInput';

interface EditPictureFileInputProps {
  previewUrl: string | ArrayBuffer | null;
  pictureType: 'avatar' | 'postPicture';
  label: string;
}

const EditPictureFileInput = ({
  pictureType,
  previewUrl,
  label,
}: EditPictureFileInputProps) => {
  const isAvatar = pictureType === 'avatar';

  if (isAvatar) {
    return <EditAvatarInput previewUrl={previewUrl} label={label} />;
  } else {
    return <EditPostPictureInput previewUrl={previewUrl} label={label} />;
  }
};

export default EditPictureFileInput;
