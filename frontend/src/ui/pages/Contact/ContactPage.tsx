import useSendContactMessage from './hooks/useSendContactMessage';
import PageLoader from '@/ui/components/Loader/PageLoader';
import ContactForm from './components/ContactForm';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './styles/ContactPage.scss';

const ContactPage = () => {
  const { t } = useTranslation();
  const { onSubmit, isPending } = useSendContactMessage();

  if (isPending) return <PageLoader isLoading={isPending} />;

  return (
    <div className="contact-page-main-container">
      <Helmet>
        <title>{t('SEO.contact.title')}</title>
        <meta name="description" content={t('SEO.contact.description')} />
      </Helmet>
      <h2 className="main-title">{t('pages.contact.title')}</h2>
      <ContactForm onSubmit={onSubmit} />
    </div>
  );
};

export default ContactPage;
