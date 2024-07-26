interface CustomButtonProps {
  type?: 'primary' | 'success' | 'error' | 'disabled';
  isDisabled?: boolean;
  text: string;
  onClick: () => void;
}

const CustomButton = ({
  type = 'primary',
  isDisabled = false,
  text,
  onClick,
}: CustomButtonProps) => {
  const classNames = `btn btn-${type}`;

  return (
    <button
      aria-disabled={isDisabled}
      className={classNames}
      disabled={isDisabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
