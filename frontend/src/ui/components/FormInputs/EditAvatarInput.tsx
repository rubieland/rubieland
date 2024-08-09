import DefaultAvatar from '../Icons/DefaultAvatar';
import colors from '../../../assets/styles/colors';
import i18n from '../../../core/i18n';
import Camera from '../Icons/Camera';

interface EditAvatarInputProps {
  imgSrc: string;
  label: string;
}

const EditAvatarInput = ({ imgSrc, label }: EditAvatarInputProps) => {
  return (
    <figure className="edit-avatar-figure">
      {!imgSrc ? (
        <DefaultAvatar color={colors.grey50} />
      ) : (
        // TODO: replace <img /> with <Cropper />
        <img src={imgSrc} alt={label} />
      )}
      <figcaption className="edit-avatar-figcaption">
        <Camera color={colors.white} />
        <p>{i18n.t('common.edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditAvatarInput;
