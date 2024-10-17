interface UserPhoneCellProps {
  phone: string;
}

const UserPhoneCell = ({ phone }: UserPhoneCellProps) => {
  return (
    <div>
      <span>{phone}</span>
    </div>
  );
};

export default UserPhoneCell;
