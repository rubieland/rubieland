interface CustomButtonProps {
  style?: 'primary' | 'secondary' | 'success' | 'error';
  type?: 'submit' | 'reset' | 'button';
  width?: string | number;
  isDisabled?: boolean;
  outlined?: boolean;
  onClick?: () => void;
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
  const initialClasses: string[] = ['btn'];

  const classNames = [
    ...initialClasses,
    outlined ? `btn-${style}-outlined` : `btn-${style}`,
    isDisabled ? 'btn-disabled' : '',
  ]
    .reduce<string[]>((acc, curr) => {
      if (curr) acc.push(curr);
      return acc;
    }, [])
    .join(' ');

  const getWidth = typeof width === 'string' ? width : `${width}px`;

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
