import DefaultAvatar from '../Icons/DefaultAvatar';
import colors from '../../../assets/styles/colors';
import { useTranslation } from 'react-i18next';
import Camera from '../Icons/Camera';

interface EditAvatarInputProps {
  previewUrl: string | ArrayBuffer | null;
  label: string;
}

const EditAvatarInput = ({ previewUrl, label }: EditAvatarInputProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const isPreviewUrlString = previewUrl && typeof previewUrl === 'string';

  return (
    <figure className="edit-avatar-figure">
      {isPreviewUrlString ? (
        <img src={previewUrl} alt={label} />
      ) : (
        <DefaultAvatar color={colors.grey50} />
      )}
      <figcaption className="edit-avatar-figcaption">
        <Camera color={colors.white} />
        <p>{t('edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditAvatarInput;
