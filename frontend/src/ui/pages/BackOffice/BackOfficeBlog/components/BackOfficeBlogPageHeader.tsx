import CustomButton from '@/ui/components/Button/CustomButton';
import CirclePlus from '@/ui/components/Icons/CirclePlus';
import { useNavigate } from '@tanstack/react-router';
import '../styles/BackOfficeBlogPageHeader.scss';
import { useTranslation } from 'react-i18next';
import colors from '@/assets/styles/colors';

const BackOfficeBlogPageHeader = () => {
  const navigate = useNavigate({ from: '/back-office/blog/' });
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  const handleNavigate = () => {
    navigate({ to: '/back-office/blog/create-post' });
  };

  return (
    <header className="bo-blog-section-header">
      <h2>{t('title')}</h2>
      <CustomButton
        icon={<CirclePlus width={24} height={24} stroke={colors.primary} />}
        onClick={handleNavigate}
        title={t('createPost')}
        iconPosition="right"
        style="primary"
        width={1}
      />
    </header>
  );
};

export default BackOfficeBlogPageHeader;
