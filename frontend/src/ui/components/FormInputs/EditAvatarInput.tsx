import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import DefaultAvatar from '../Icons/DefaultAvatar';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import Camera from '../Icons/Camera';

interface EditAvatarInputProps {
  pictureFile: string | File | null;
  label: string;
}

const EditAvatarInput = ({ pictureFile, label }: EditAvatarInputProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const imgSrc = pictureFile
    ? typeof pictureFile === 'string'
      ? `${API_URL}/${API_BLOG_PICTURES_PATH}/${pictureFile}`
      : URL.createObjectURL(pictureFile)
    : '';

  return (
    <figure className="edit-avatar-figure">
      {pictureFile ? (
        <img src={imgSrc} alt={label} />
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
