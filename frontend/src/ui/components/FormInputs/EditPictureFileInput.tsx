import EditPostPictureInput from './EditPostPictureInput';
import EditAvatarInput from './EditAvatarInput';

interface EditPictureFileInputProps {
  pictureType: 'avatar' | 'postPicture';
  imageSource: File | string | null;
  label: string;
}

const EditPictureFileInput = ({
  pictureType,
  imageSource,
  label,
}: EditPictureFileInputProps) => {
  const isAvatar = pictureType === 'avatar';

  if (isAvatar) {
    return <EditAvatarInput imageSource={imageSource} label={label} />;
  } else {
    return <EditPostPictureInput imageSource={imageSource} label={label} />;
  }
};

export default EditPictureFileInput;
