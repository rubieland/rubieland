import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import { useTranslation } from 'react-i18next';

interface EditPostPictureInputProps {
  pictureFile: File | string | null;
  label: string;
}

const EditPostPictureInput = ({
  pictureFile,
  label,
}: EditPostPictureInputProps) => {
  const { t } = useTranslation();

  // if pictureFile is a string, it means that the picture is already uploaded and we should get it from the server
  // if it is a File, it means that the user has selected a new picture and we should display it
  const imgSrc = pictureFile
    ? typeof pictureFile === 'string'
      ? `${API_URL}/${API_BLOG_PICTURES_PATH}/${pictureFile}`
      : URL.createObjectURL(pictureFile)
    : '';

  return (
    <figure className="edit-post-picture-figure">
      {pictureFile ? (
        <img src={imgSrc} alt={label} />
      ) : (
        <>
          <ImageCircle color={colors.grey60} />
          <p>{t('common.addPicture')}</p>
        </>
      )}
    </figure>
  );
};

export default EditPostPictureInput;
