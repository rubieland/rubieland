interface UserEmailCellProps {
  email: string;
}

const UserEmailCell = ({ email }: UserEmailCellProps) => {
  return <span className="table-cell-content">{email}</span>;
};

export default UserEmailCell;
