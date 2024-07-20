import { useTranslation } from 'react-i18next';
import i18n from './core/i18n';
import './App.css';

export const App = () => {
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <p>{t('hello')}</p>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('en')}>English</button>
    </div>
  );
};

export default App;
