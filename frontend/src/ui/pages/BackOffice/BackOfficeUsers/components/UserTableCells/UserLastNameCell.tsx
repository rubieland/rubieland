interface UserLastNameCellProps {
  lastName: string;
}

const UserLastNameCell = ({ lastName }: UserLastNameCellProps) => {
  return (
    <div>
      <span>{lastName}</span>
    </div>
  );
};

export default UserLastNameCell;
