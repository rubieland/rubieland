import EditPostPictureInput from './EditPostPictureInput';
import EditAvatarInput from './EditAvatarInput';

interface EditPictureFileInputProps {
  pictureType: 'avatar' | 'postPicture';
  pictureFile: File | string | null;
  label: string;
}

const EditPictureFileInput = ({
  pictureType,
  pictureFile,
  label,
}: EditPictureFileInputProps) => {
  const isAvatar = pictureType === 'avatar';

  if (isAvatar) {
    return <EditAvatarInput pictureFile={pictureFile} label={label} />;
  } else {
    return <EditPostPictureInput pictureFile={pictureFile} label={label} />;
  }
};

export default EditPictureFileInput;
