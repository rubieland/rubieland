import CustomButton from '@/ui/components/Button/CustomButton';
import CirclePlus from '@/ui/components/Icons/CirclePlus';
import '../styles/BackOfficeBlogPageHeader.scss';
import { useTranslation } from 'react-i18next';
import colors from '@/assets/styles/colors';

const BackOfficeBlogPageHeader = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.blog',
  });

  return (
    <header className="bo-blog-section-header">
      <h2>{t('title')}</h2>
      <CustomButton
        icon={<CirclePlus width={24} height={24} stroke={colors.primary} />}
        onClick={() => console.log(t('createPost'))}
        title={t('createPost')}
        iconPosition="right"
        style="primary"
        width={1}
      />
    </header>
  );
};

export default BackOfficeBlogPageHeader;
