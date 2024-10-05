import { Post } from '@/models/posts/post.entity';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';

// DOCS: https://tanstack.com/table/latest/docs/faq

interface DataTableProps {
  //   dataType: 'posts';
  //   data: Post[];
}

const DataTable = ({ dataType, data }: DataTableProps) => {
  //   const keyPrefix = `pages.backOffice.tables.${dataType}`;
  //   const { t } = useTranslation('translation', {
  //     keyPrefix,
  //   });

  //   const columns = useMemo(
  //     () =>
  //       data.length > 0
  //         ? Object.keys(data[0]).map((key) => ({
  //             header: t(`columnsHeaders.${key}`),
  //             accessorKey: key,
  //           }))
  //         : [],
  //     [data],
  //   );

  console.log('columns', columns);

  // const table = useReactTable({
  //   data,
  //   columns,
  // });
  return (
    <Table>
      <TableCaption>Table Caption</TableCaption>
      <TableHead>
        <TableRow>
          <TableHeader>Header 1</TableHeader>
          <TableHeader>Header 2</TableHeader>
          <TableHeader>Header 3</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
          <TableCell>Cell 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell 4</TableCell>
          <TableCell>Cell 5</TableCell>
          <TableCell>Cell 6</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DataTable;
