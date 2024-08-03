import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import ImagePen from '../Icons/ImagePen';
import i18n from '../../../core/i18n';

interface EditArticlePictureInputProps {
  previewUrl: string | ArrayBuffer | null;
  label: string;
}

const EditArticlePictureInput = ({
  previewUrl,
  label,
}: EditArticlePictureInputProps) => {
  const isPreviewUrlString = previewUrl && typeof previewUrl === 'string';

  return (
    <figure className="edit-article-picture-figure">
      {isPreviewUrlString ? (
        <img src={previewUrl} alt={label} />
      ) : (
        <>
          <ImageCircle color={colors.grey50} />
          <p>{i18n.t('common.addPicture')}</p>
        </>
      )}
      <figcaption className="edit-article-picture-figcaption">
        <ImagePen color={colors.white} />
        <p>{i18n.t('common.edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditArticlePictureInput;
