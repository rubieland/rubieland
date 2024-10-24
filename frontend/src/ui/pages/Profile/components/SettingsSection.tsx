import Separator from '@/ui/components/Separator/Separator';
import useSwitchLanguage from '../hooks/useSwitchLanguage';
import { useTranslation } from 'react-i18next';
import '../styles/SettingsSection.scss';

const SettingsSection = () => {
  const { t } = useTranslation();
  const { currentLanguage, switchLanguage } = useSwitchLanguage();

  // TODO: maybe save user's language preference in cookies or local storage

  return (
    <section className="settings-section-main-container">
      <h2 className="main-title">{t('pages.profile.settingsSection.title')}</h2>
      <Separator />
      <div className="settings-section-content">
        <div className="language-block">
          <label htmlFor="language">
            {t('pages.profile.settingsSection.language')}
          </label>
          <select
            onChange={(e) => switchLanguage(e.target.value)}
            value={currentLanguage}
            aria-label="language"
            className="select"
            name="language"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default SettingsSection;
