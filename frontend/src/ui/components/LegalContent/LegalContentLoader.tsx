import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './LegalContentLoader.scss';

interface LegalContentLoaderProps {
  fileBaseName: 'privacy-policy' | 'legal-notice';
}

const LegalContentLoader = ({ fileBaseName }: LegalContentLoaderProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language;
    const filePath =
      language === 'fr'
        ? `/${fileBaseName}-fr.html`
        : `/${fileBaseName}-en.html`;

    fetch(filePath)
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => {
        console.error(`Failed to load ${fileBaseName} document`, error);
      });
  }, [i18n.language, fileBaseName]);

  return (
    <div
      className="legal-content-container"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default LegalContentLoader;
