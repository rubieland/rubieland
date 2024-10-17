interface UserFirstNameCellProps {
  firstName: string;
}

const UserFirstNameCell = ({ firstName }: UserFirstNameCellProps) => {
  return <span className="table-cell-content">{firstName}</span>;
};

export default UserFirstNameCell;
