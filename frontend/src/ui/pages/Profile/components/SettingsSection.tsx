import useSwitchLanguage from '../hooks/useSwitchLanguage';
import { useTranslation } from 'react-i18next';
import '../styles/SettingsSection.scss';

const SettingsSection = () => {
  const { t } = useTranslation();
  const { currentLanguage, switchLanguage } = useSwitchLanguage();

  // TODO: maybe save user's language preference in cookies or local storage

  return (
    <div className="settings-section-main-container">
      <h2 className="main-title">{t('pages.profile.settingsSection.title')}</h2>
      <div className="settings-section-content">
        <div className="language-block">
          <p>{t('pages.profile.settingsSection.language')}</p>
          <select
            className="select"
            onChange={(e) => switchLanguage(e.target.value)}
            value={currentLanguage}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
