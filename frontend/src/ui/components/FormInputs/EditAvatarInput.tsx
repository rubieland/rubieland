import DefaultAvatar from '../Icons/DefaultAvatar';
import colors from '../../../assets/styles/colors';
import i18n from '../../../core/i18n';
import Camera from '../Icons/Camera';

interface EditAvatarInputProps {
  previewUrl: string | ArrayBuffer | null;
  label: string;
}

const EditAvatarInput = ({ previewUrl, label }: EditAvatarInputProps) => {
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
        <p>{i18n.t('common.edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditAvatarInput;
