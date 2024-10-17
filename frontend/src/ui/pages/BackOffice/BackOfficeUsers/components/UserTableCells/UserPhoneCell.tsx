interface UserPhoneCellProps {
  phone: string;
}

const UserPhoneCell = ({ phone }: UserPhoneCellProps) => {
  return <span className="table-cell-content">{phone}</span>;
};

export default UserPhoneCell;
