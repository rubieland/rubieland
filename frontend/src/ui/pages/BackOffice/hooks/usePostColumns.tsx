import PostPictureCell from '@/ui/components/Table/PostPictureCell';
import PostActionsCell from '@/ui/components/Table/PostActionsCell';
import PostContentCell from '@/ui/components/Table/PostContentCell';
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
      header: () => t('content'),
      accessorKey: 'content',
      cell: (info) => <PostContentCell content={info.getValue()} />,
      size: 150,
    },
    {
      header: () => t('status'),
      accessorKey: 'isPublished',
      cell: (info) => <PostStatusCell value={info.getValue()} />,
    },
    {
      header: () => t('createdAt'),
      accessorKey: 'createdAt',
      cell: (info) => (
        <PostDateCell dateString={info.getValue()} dateType="createdAt" />
      ),
    },
    {
      header: () => t('updatedAt'),
      accessorKey: 'updatedAt',
      cell: (info) => (
        <PostDateCell dateString={info.getValue()} dateType="updatedAt" />
      ),
    },
    {
      header: () => t('actions'),
      accessorKey: 'actions',
      cell: (info) => <PostActionsCell postId={info.row.original.id} />,
    },
  ];

  return postColumns;
};
