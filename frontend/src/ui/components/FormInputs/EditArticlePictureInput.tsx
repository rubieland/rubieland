import colors from '../../../assets/styles/colors';
import ImageCircle from '../Icons/ImageCircle';
import ImagePen from '../Icons/ImagePen';
import i18n from '../../../core/i18n';

interface EditArticlePictureInputProps {
  imgSrc: string;
  label: string;
}

const EditArticlePictureInput = ({
  imgSrc,
  label,
}: EditArticlePictureInputProps) => {
  return (
    <figure className="edit-article-picture-figure">
      {!imgSrc ? (
        <ImageCircle color={colors.grey50} />
      ) : (
        <img src={imgSrc} alt={label} />
      )}
      <figcaption className="edit-article-picture-figcaption">
        <ImagePen color={colors.white} />
        <p>{i18n.t('common.edit')}</p>
      </figcaption>
    </figure>
  );
};

export default EditArticlePictureInput;
