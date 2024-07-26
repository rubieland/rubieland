interface CustomButtonProps {
  style?: 'primary' | 'success' | 'error';
  type?: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  onClick?: () => void;
  title: string;
}

const CustomButton = ({
  isDisabled = false,
  style = 'primary',
  type = 'button',
  onClick,
  title,
}: CustomButtonProps) => {
  const classNames = isDisabled ? 'btn btn-disabled' : `btn btn-${style}`;

  return (
    <button
      aria-disabled={isDisabled}
      className={classNames}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};

export default CustomButton;
