import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import DefaultAvatar from '../Icons/DefaultAvatar';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import Camera from '../Icons/Camera';

interface EditAvatarInputProps {
  imageSource: string | File | null;
  label: string;
}

const EditAvatarInput = ({ imageSource, label }: EditAvatarInputProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  // if imageSource is a string, it means that the picture already exists and we should get it from the server
  // if it is a File, it means that the user has selected a new picture and we should display it
  // if it is null, it means that there is no picture from the server or the user has not selected a new picture yet
  const imgSrc = imageSource
    ? typeof imageSource === 'string'
      ? `${API_URL}/${API_BLOG_PICTURES_PATH}/${imageSource}`
      : URL.createObjectURL(imageSource)
    : null;

  return (
    <figure className="edit-avatar-figure">
      {imgSrc ? (
        <img src={imgSrc} alt={label} loading="lazy" />
      ) : (
        <DefaultAvatar color={colors.grey60} />
      )}
      <figcaption className="edit-avatar-figcaption">
        <Camera color={colors.white} />
        <p>{t('edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditAvatarInput;
