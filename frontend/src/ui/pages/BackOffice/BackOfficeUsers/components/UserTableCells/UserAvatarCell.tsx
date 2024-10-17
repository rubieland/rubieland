interface UserAvatarCellProps {
  avatar: string | null;
}

const UserAvatarCell = ({ avatar }: UserAvatarCellProps) => {
  return (
    <div>
      <p>{avatar}</p>
    </div>
  );
};

export default UserAvatarCell;
