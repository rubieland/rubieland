import defaultImgMedium from '../../../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../../../assets/illustrations/blog_default_img_small.png';
import { PostSchemaFormData } from '../../hooks/usePostFormValidation';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import PostTabsHeader from './PostTabsHeader';
import '../styles/PostPreview.scss';

const imageSources = [
  { media: '(min-width: 500px)', srcSet: defaultImgMedium },
];

interface PostPreviewProps {
  formMethods: UseFormReturn<PostSchemaFormData>;
}

const PostPreview = ({ formMethods }: PostPreviewProps) => {
  const { t } = useTranslation();
  const { getValues } = formMethods;
  const { title, content, picture } = getValues();
  const now = new Date();

  const imgSrc = picture
    ? typeof picture === 'string'
      ? `${API_URL}/${API_BLOG_PICTURES_PATH}/${picture}`
      : URL.createObjectURL(picture)
    : null;

  return (
    <section>
      <PostTabsHeader title={t('common.preview')} />
      <div className="post-preview-article-container">
        <article className="post-preview-article">
          <header className="post-details-header">
            <h3 className="post-details-title">
              {title || t('form.post.title')}
            </h3>
            <p className="post-updated-date">{`${t('pages.blog.postDetailsPage.updatedOn', { date: now })}`}</p>
            <div className="post-details-image-container">
              {!imgSrc ? (
                <ResponsiveImage
                  defaultSrc={defaultImgSmall}
                  alt={t('common.preview')}
                  srcSet={imageSources}
                />
              ) : (
                <img src={imgSrc} alt={t('common.preview')} loading="lazy" />
              )}
            </div>
          </header>
          <p className="post-details-content">
            {content || t('form.post.content')}
          </p>
        </article>
      </div>
    </section>
  );
};

export default PostPreview;
