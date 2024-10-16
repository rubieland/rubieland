import { useEffect, useState } from 'react';
import i18n from '@/core/i18n';

const useSwitchLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, []);

  return { currentLanguage, switchLanguage };
};

export default useSwitchLanguage;
