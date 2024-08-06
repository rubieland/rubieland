import classNames from 'classnames';

interface CustomButtonProps {
  style?: 'primary' | 'secondary' | 'success' | 'error';
  type?: 'submit' | 'reset' | 'button';
  width?: string | number;
  onClick?: () => void;
  isDisabled?: boolean;
  outlined?: boolean;
  title: string;
}

const CustomButton = ({
  isDisabled = false,
  style = 'primary',
  outlined = false,
  type = 'button',
  width = '100%',
  onClick,
  title,
}: CustomButtonProps) => {
  const className = classNames('btn', {
    [`btn-${style}-outlined`]: outlined,
    [`btn-${style}`]: !outlined,
    'btn-disabled': isDisabled,
  });

  const getWidth = typeof width === 'string' ? width : `${width}rem`;

  return (
    <button
      aria-disabled={isDisabled}
      style={{ width: getWidth }}
      className={className}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};

export default CustomButton;
