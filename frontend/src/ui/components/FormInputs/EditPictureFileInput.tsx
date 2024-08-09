import EditArticlePictureInput from './EditArticlePictureInput';
import EditAvatarInput from './EditAvatarInput';

interface EditPictureFileInputProps {
  pictureType: 'avatar' | 'articlePicture';
  imgSrc: string;
  label: string;
}

const EditPictureFileInput = ({
  pictureType,
  imgSrc,
  label,
}: EditPictureFileInputProps) => {
  const isAvatar = pictureType === 'avatar';

  if (isAvatar) {
    return <EditAvatarInput imgSrc={imgSrc} label={label} />;
  } else {
    return <EditArticlePictureInput imgSrc={imgSrc} label={label} />;
  }
};

export default EditPictureFileInput;
