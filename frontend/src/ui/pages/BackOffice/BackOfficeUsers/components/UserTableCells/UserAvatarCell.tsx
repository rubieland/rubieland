import { API_URL, API_USERS_AVATARS_PATH } from '@/core/envConfig';
import { useTranslation } from 'react-i18next';
import '../../styles/UserAvatarCell.scss';

interface UserAvatarCellProps {
  avatar: string | null;
}

const UserAvatarCell = ({ avatar }: UserAvatarCellProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.users',
  });

  return (
    <div className="user-avatar-cell">
      {avatar ? (
        <img
          src={`${API_URL}/${API_USERS_AVATARS_PATH}/${avatar}`}
          alt={t('avatarAlt')}
        />
      ) : (
        <span className="no-image">{t('noAvatar')}</span>
      )}
    </div>
  );
};

export default UserAvatarCell;
