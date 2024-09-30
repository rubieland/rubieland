import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import ImagePen from '../Icons/ImagePen';
import i18n from '../../../core/i18n';

interface EditPostPictureInputProps {
  previewUrl: string | ArrayBuffer | null;
  label: string;
}

const EditPostPictureInput = ({
  previewUrl,
  label,
}: EditPostPictureInputProps) => {
  const isPreviewUrlString = previewUrl && typeof previewUrl === 'string';

  return (
    <figure className="edit-post-picture-figure">
      {isPreviewUrlString ? (
        <img src={previewUrl} alt={label} />
      ) : (
        <>
          <ImageCircle color={colors.grey50} />
          <p>{i18n.t('common.addPicture')}</p>
        </>
      )}
      <figcaption className="edit-post-picture-figcaption">
        <ImagePen color={colors.white} />
        <p>{i18n.t('common.edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditPostPictureInput;
