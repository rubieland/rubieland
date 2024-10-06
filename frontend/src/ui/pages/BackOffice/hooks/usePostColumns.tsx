import colors from '@/assets/styles/colors';
import { API_BLOG_PICTURES_PATH, API_URL } from '@/core/envConfig';
import { Post } from '@/models/posts/post.entity';
import CustomButton from '@/ui/components/Button/CustomButton';
import Bin from '@/ui/components/Icons/Bin';
import PenSquare from '@/ui/components/Icons/PenSquare';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

export const usePostColumns = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.backOffice.tables.posts',
  });

  const postColumns: ColumnDef<Post, any>[] = [
    {
      header: () => t('picture'),
      accessorKey: 'picture',
      cell: (info) =>
        info.getValue() ? (
          <img
            src={`${API_URL}/${API_BLOG_PICTURES_PATH}/${info.getValue()}`}
            alt={t('pictureAlt')}
            width={100}
            height="auto"
          />
        ) : (
          t('noImage')
        ),
    },
    {
      header: () => t('title'),
      accessorKey: 'title',
      cell: (info) => info.getValue(),
    },
    {
      header: () => t('content'),
      accessorKey: 'content',
      cell: (info) => info.getValue().slice(0, 50) + '...',
    },
    {
      // TODO: create a custom cell for status
      header: () => t('status'),
      accessorKey: 'isPublished',
      cell: (info) => (info.getValue() ? t('published') : t('unpublished')),
    },
    {
      header: () => t('createdAt'),
      accessorKey: 'createdAt',
      cell: (info) => t('createdAtDate', { date: new Date(info.getValue()) }),
    },
    {
      header: () => t('updatedAt'),
      accessorKey: 'updatedAt',
      cell: (info) => t('updatedAtDate', { date: new Date(info.getValue()) }),
    },
    {
      // TODO: create a custom cell for actions
      header: () => t('actions'),
      accessorKey: 'id',
      cell: () => (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <CustomButton
            onClick={() => console.log(t('edit'))}
            title={t('edit')}
            style="secondary"
            icon={<PenSquare width={24} height={24} stroke={colors.white} />}
            iconPosition="right"
            outlined
          />
          <CustomButton
            onClick={() => console.log(t('delete'))}
            title={t('delete')}
            icon={<Bin width={24} height={24} stroke={colors.white} />}
            iconPosition="right"
            style="error"
          />
        </div>
      ),
    },
  ];

  return postColumns;
};
