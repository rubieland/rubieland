import UserFirstNameCell from '../BackOfficeUsers/components/UserTableCells/UserFirstNameCell';
import UserLastNameCell from '../BackOfficeUsers/components/UserTableCells/UserLastNameCell';
import UserAvatarCell from '../BackOfficeUsers/components/UserTableCells/UserAvatarCell';
import UserEmailCell from '../BackOfficeUsers/components/UserTableCells/UserEmailCell';
import UserPhoneCell from '../BackOfficeUsers/components/UserTableCells/UserPhoneCell';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/models/user/user.entity';
import { useTranslation } from 'react-i18next';

const useUserColumns = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.users',
  });

  const userColumns: ColumnDef<User, any>[] = [
    {
      header: () => t('avatar'),
      accessorKey: 'avatar',
      cell: (info) => <UserAvatarCell avatar={info.getValue()} />,
    },
    {
      header: () => t('lastName'),
      accessorKey: 'lastName',
      cell: (info) => <UserLastNameCell lastName={info.getValue()} />,
    },
    {
      header: () => t('firstName'),
      accessorKey: 'firstName',
      cell: (info) => <UserFirstNameCell firstName={info.getValue()} />,
    },
    {
      header: () => t('email'),
      accessorKey: 'email',
      cell: (info) => <UserEmailCell email={info.getValue()} />,
    },
    {
      header: () => t('phone'),
      accessorKey: 'phone',
      cell: (info) => <UserPhoneCell phone={info.getValue()} />,
    },

    // TODO: implement mailto feature
    // {
    //   header: () => t('actions'),
    //   accessorKey: 'actions',
    //   cell: (info) => <UserActionsCell picture={info.row.original.id} />,
    // },
  ];

  return userColumns;
};

export default useUserColumns;
