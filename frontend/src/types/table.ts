import {
  Cell as CellType,
  Column as ColumnType,
  Row as RowType,
  Table as TableType,
} from '@tanstack/react-table';

export type DataTypes = string | number | Date | boolean | null;

export type CellProps<TData> = {
  table: TableType<TData>;
  row: RowType<TData>;
  column: ColumnType<TData>;
  cell: CellType<TData, DataTypes>;
  getValue: () => any;
  renderValue: () => any;
};
