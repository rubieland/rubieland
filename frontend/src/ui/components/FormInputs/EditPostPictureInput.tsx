import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import { useTranslation } from 'react-i18next';

interface EditPostPictureInputProps {
  imageSource: File | string | null;
  label: string;
}

const EditPostPictureInput = ({
  imageSource,
  label,
}: EditPostPictureInputProps) => {
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
    <figure className="edit-post-picture-figure">
      {imgSrc ? (
        <img src={imgSrc} alt={label} loading="lazy" />
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
