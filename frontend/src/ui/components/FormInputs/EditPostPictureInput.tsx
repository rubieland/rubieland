import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import { useTranslation } from 'react-i18next';

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
          <ImageCircle color={colors.grey60} />
          <p>{t('addPicture')}</p>
        </>
      )}
    </figure>
  );
};

export default EditPostPictureInput;
