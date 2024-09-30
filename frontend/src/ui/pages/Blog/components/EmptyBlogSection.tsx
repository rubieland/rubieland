import imgMedium from '../../../../assets/illustrations/blog_empty_medium.png';
import imgSmall from '../../../../assets/illustrations/blog_empty_small.png';
import ResponsiveImage from '../../../components/Image/ResponsiveImage';
import { useTranslation } from 'react-i18next';
import '../styles/EmptyBlogSection.scss';

const imageSources = [{ media: '(min-width: 500px)', src: imgMedium }];

const EmptyBlogSection = () => {
  const { t } = useTranslation('', { keyPrefix: 'pages.blog' });

  return (
    <section className="empty-blog-section">
      <p>{t('emptyBlogText')}</p>
      <div className="empty-blog-illustration">
        <ResponsiveImage
          alt={`Image - ${t('emptyBlogText')}`}
          srcSet={imageSources}
          defaultSrc={imgSmall}
        />
      </div>
    </section>
  );
};

export default EmptyBlogSection;
