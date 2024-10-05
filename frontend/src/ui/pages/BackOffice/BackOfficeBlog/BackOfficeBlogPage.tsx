import { useGetAllPostsBackOffice } from '../../../../api/backOffice/blog/getAllPostsBackOffice';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import BackOfficePostCard from './components/BackOfficePostCard';
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
import DataTable from '@/ui/components/Table/DataTable';
import { log } from 'console';
import { use } from 'i18next';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

const BackOfficeBlogPage = () => {
  const { data: posts, isLoading, error, refetch } = useGetAllPostsBackOffice();
  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: (props) => <p>{props.getValue()}</p>,
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

  console.log('** table **', table.getHeaderGroups());

  return (
    <div className="bo-blog-page-main-container">
      <p>BackOfficeBlogPage</p>
      {/* <Table>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.column.columnDef.header}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </Table> */}

      <table className="tw-w-full tw-caption-bottom tw-text-sm">
        <thead>
          <tr className="tw-border-b tw-transition-colors hover:tw-bg-neutral-100/50 data-[state=selected]:tw-bg-neutral-100 dark:hover:tw-bg-neutral-800/50 dark:data-[state=selected]:tw-bg-neutral-800">
            <th className="tw-h-10 tw-px-2 tw-text-left tw-align-middle tw-font-medium tw-text-neutral-500 dark:tw-text-neutral-400">
              ID
            </th>
            <th className="tw-h-10 tw-px-2 tw-text-left tw-align-middle tw-font-medium tw-text-neutral-500 dark:tw-text-neutral-400">
              Title
            </th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((post, i) => (
              <tr key={i} className="tw-border-b">
                <td className="tw-h-10 tw-px-2">{post.id}</td>
                <td className="tw-h-10 tw-px-2">{post.title}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* <section className="posts-list">
        {posts &&
          posts.length > 0 &&
          posts.map((post, i) => <BackOfficePostCard post={post} key={i} />)}
      </section> */}
    </div>
  );
};

export default BackOfficeBlogPage;
