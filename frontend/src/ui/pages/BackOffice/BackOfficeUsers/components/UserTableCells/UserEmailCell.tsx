interface UserEmailCellProps {
  email: string;
}

const UserEmailCell = ({ email }: UserEmailCellProps) => {
  return (
    <div>
      <span>{email}</span>
    </div>
  );
};

export default UserEmailCell;
