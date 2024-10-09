import defaultImgMedium from '../../../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../../../assets/illustrations/blog_default_img_small.png';
import { CreatePostSchemaFormData } from '../../hooks/useCreatePostFormValidation';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import Separator from '@/ui/components/Separator/Separator';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import '../styles/PostPreview.scss';

const imageSources = [
  { media: '(min-width: 500px)', srcSet: defaultImgMedium },
];

interface PostPreviewProps {
  formMethods: UseFormReturn<CreatePostSchemaFormData>;
}

const PostPreview = ({ formMethods }: PostPreviewProps) => {
  const { t } = useTranslation();
  const { getValues } = formMethods;
  const { title, content, picture } = getValues();
  const now = new Date();

  return (
    <section>
      <h2 className="post-preview-title">{t('common.preview')}</h2>
      <Separator />
      <article className="post-details-main-container">
        <header className="post-details-header">
          <h3 className="post-details-title">
            {title || "Titre de l'article"}
          </h3>
          <p className="post-published-date">
            {`${t('pages.blog.postDetailsPage.postedOn', {
              date: now,
            })}`}
          </p>
          <p className="post-updated-date">{`${t('pages.blog.postDetailsPage.updatedOn', { date: now })}`}</p>
          <div className="post-details-image-container">
            {!picture ? (
              <ResponsiveImage
                defaultSrc={defaultImgSmall}
                alt={`${t('common.preview')} - ${title}`}
                srcSet={imageSources}
              />
            ) : (
              <img
                src={URL.createObjectURL(picture[0])}
                alt={`${t('common.preview')} - ${title}`}
                loading="lazy"
              />
            )}
          </div>
        </header>
        <p className="post-details-content">
          {content || "Contenu de l'article"}
        </p>
      </article>
    </section>
  );
};

export default PostPreview;
