interface CustomButtonProps {
  style?: 'primary' | 'success' | 'error';
  type?: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  onClick?: () => void;
  width?: string | number;
  title: string;
}

const CustomButton = ({
  isDisabled = false,
  style = 'primary',
  type = 'button',
  width = '100%',
  onClick,
  title,
}: CustomButtonProps) => {
  const classNames = isDisabled ? 'btn btn-disabled' : `btn btn-${style}`;
  const getWidth = typeof width === 'string' ? `${width}` : width;

  return (
    <button
      aria-disabled={isDisabled}
      style={{ width: getWidth }}
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
