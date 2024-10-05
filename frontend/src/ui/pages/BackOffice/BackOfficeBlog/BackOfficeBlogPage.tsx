import { useGetAllPostsBackOffice } from '../../../../api/backOffice/blog/getAllPostsBackOffice';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import PageLoader from '../../../components/Loader/PageLoader';
import './styles/BackOfficeBlogPage.scss';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { Post } from '@/models/posts/post.entity';
import { CellProps, DataTypes } from '@/types/table';

const BackOfficeBlogPage = () => {
  const { data: posts, isLoading, error, refetch } = useGetAllPostsBackOffice();

  const columns = useMemo<ColumnDef<Post, DataTypes>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        // Size is optional
        size: 50,
        cell: (props: CellProps<Post>) => <p>{props.getValue()}</p>,
      },
      {
        header: 'Title',
        accessorKey: 'title',
        size: 50,
        cell: (props: CellProps<Post>) => <p>{props.getValue()}</p>,
      },
      {
        header: 'Content',
        accessorKey: 'content',
        size: 50,
        cell: (props: CellProps<Post>) => <p>{props.getValue()}</p>,
      },
      {
        header: 'Picture',
        accessorKey: 'picture',
        size: 50,
        cell: (props: CellProps<Post>) => (
          <p>{props.getValue() ?? 'No picture'}</p>
        ),
      },
      {
        header: 'Is Published',
        accessorKey: 'isPublished',
        size: 50,
        cell: (props: CellProps<Post>) => <p>{String(props.getValue())}</p>,
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
        size: 50,
        cell: (props: CellProps<Post>) => <p>{props.getValue()}</p>,
      },
      {
        header: 'Updated At',
        accessorKey: 'updatedAt',
        size: 50,
        cell: (props: CellProps<Post>) => <p>{props.getValue()}</p>,
      },
    ],

    [],
  );

  const table = useReactTable({
    data: posts ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <PageLoader isLoading={isLoading} />;
  if (error)
    return <ErrorComponent message={error.message} onRetry={refetch} />;

  return (
    <div className="bo-blog-page-main-container">
      <p>BackOfficeBlogPage</p>
      <Table style={{ width: table.getTotalSize() }}>
        {/* TODO: Replace with i18n */}
        <TableCaption>Posts</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: header.getSize() }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <section className="posts-list">
        {posts &&
          posts.length > 0 &&
          posts.map((post, i) => <BackOfficePostCard post={post} key={i} />)}
      </section> */}
    </div>
  );
};

export default BackOfficeBlogPage;
