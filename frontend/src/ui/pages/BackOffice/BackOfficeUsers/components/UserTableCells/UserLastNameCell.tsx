interface UserLastNameCellProps {
  lastName: string;
}

const UserLastNameCell = ({ lastName }: UserLastNameCellProps) => {
  return <span className="table-cell-content">{lastName}</span>;
};

export default UserLastNameCell;
