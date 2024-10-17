import PostPictureCell from '@/ui/components/Table/PostPictureCell';
import PostActionsCell from '@/ui/components/Table/PostActionsCell';
import PostStatusCell from '@/ui/components/Table/PostStatusCell';
import PostTitleCell from '@/ui/components/Table/PostTitleCell';
import PostDateCell from '@/ui/components/Table/PostDateCell';
import { Post } from '@/models/posts/post.entity';
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
      cell: (info) => <PostPictureCell picture={info.getValue()} />,
    },
    {
      header: () => t('title'),
      accessorKey: 'title',
      cell: (info) => (
        <PostTitleCell title={info.getValue()} postId={info.row.original.id} />
      ),
    },
    {
      header: () => t('status'),
      accessorKey: 'isPublished',
      cell: (info) => <PostStatusCell value={info.getValue()} />,
    },
    {
      header: () => t('updatedAt'),
      accessorKey: 'updatedAt',
      cell: (info) => <PostDateCell dateString={info.getValue()} />,
    },
    {
      header: () => t('actions'),
      accessorKey: 'actions',
      cell: (info) => <PostActionsCell postId={info.row.original.id} />,
    },
  ];

  return postColumns;
};
