interface UserAvatarCellProps {
  avatar: string | null;
}

const UserAvatarCell = ({ avatar }: UserAvatarCellProps) => {
  return <span className="table-cell-content">{avatar}</span>;
};

export default UserAvatarCell;
