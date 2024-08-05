import EditArticlePictureInput from './EditArticlePictureInput';
import EditAvatarInput from './EditAvatarInput';

interface EditPictureFileInputProps {
  previewUrl: string | ArrayBuffer | null;
  pictureType: 'avatar' | 'articlePicture';
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
    return <EditArticlePictureInput previewUrl={previewUrl} label={label} />;
  }
};

export default EditPictureFileInput;
