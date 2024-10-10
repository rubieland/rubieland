import defaultImgMedium from '../../../../../assets/illustrations/blog_default_img_medium.png';
import defaultImgSmall from '../../../../../assets/illustrations/blog_default_img_small.png';
import { CreatePostSchemaFormData } from '../../hooks/useCreatePostFormValidation';
import ResponsiveImage from '@/ui/components/Image/ResponsiveImage';
import CreatePostTabsHeader from './CreatePostTabsHeader';
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
      <CreatePostTabsHeader title={t('common.preview')} />
      <div className="post-preview-article-container">
        <article className="post-preview-article">
          <header className="post-details-header">
            <h3 className="post-details-title">
              {title || t('form.post.title')}
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
                  alt={t('common.preview')}
                  srcSet={imageSources}
                />
              ) : (
                <img
                  src={URL.createObjectURL(picture)}
                  alt={t('common.preview')}
                  loading="lazy"
                />
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
