import '../../../assets/styles/buttons.scss';
import classNames from 'classnames';

interface CustomButtonProps {
  style?: 'primary' | 'secondary' | 'success' | 'error';
  type?: 'submit' | 'reset' | 'button';
  width?: string | number;
  onClick: () => void;
  isDisabled?: boolean;
  outlined?: boolean;
  title: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'replace';
  iconStyle?: 'stroke' | 'fill';
}

const CustomButton = ({
  isDisabled = false,
  style = 'primary',
  outlined = false,
  type = 'button',
  width = '100%',
  onClick,
  title,
  icon,
  iconPosition = 'left',
  iconStyle = 'stroke',
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
      {icon && iconPosition === 'left' && (
        <span
          className={
            iconStyle && iconStyle === 'fill' ? 'icon-left fill' : 'icon-left'
          }
        >
          {icon}
        </span>
      )}
      {iconPosition !== 'replace' && (
        <span className="button-title">{title}</span>
      )}
      {icon && iconPosition === 'right' && (
        <span
          className={
            iconStyle && iconStyle === 'fill' ? 'icon-left fill' : 'icon-right'
          }
        >
          {icon}
        </span>
      )}
      {icon && iconPosition === 'replace' && (
        <span
          className={
            iconStyle && iconStyle === 'fill'
              ? 'icon-left fill'
              : 'icon-replace'
          }
        >
          {icon}
        </span>
      )}
    </button>
  );
};

export default CustomButton;
