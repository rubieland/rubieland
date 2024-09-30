import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import { useTranslation } from 'react-i18next';
import ImagePen from '../Icons/ImagePen';

interface EditPostPictureInputProps {
  previewUrl: string | ArrayBuffer | null;
  label: string;
}

const EditPostPictureInput = ({
  previewUrl,
  label,
}: EditPostPictureInputProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const isPreviewUrlString = previewUrl && typeof previewUrl === 'string';

  return (
    <figure className="edit-post-picture-figure">
      {isPreviewUrlString ? (
        <img src={previewUrl} alt={label} />
      ) : (
        <>
          <ImageCircle color={colors.grey50} />
          <p>{t('addPicture')}</p>
        </>
      )}
      <figcaption className="edit-post-picture-figcaption">
        <ImagePen color={colors.white} />
        <p>{t('edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditPostPictureInput;
