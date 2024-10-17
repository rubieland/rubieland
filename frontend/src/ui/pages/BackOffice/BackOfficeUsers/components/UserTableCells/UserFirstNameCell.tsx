interface UserFirstNameCellProps {
  firstName: string;
}

const UserFirstNameCell = ({ firstName }: UserFirstNameCellProps) => {
  return (
    <div>
      <span>{firstName}</span>
    </div>
  );
};

export default UserFirstNameCell;
