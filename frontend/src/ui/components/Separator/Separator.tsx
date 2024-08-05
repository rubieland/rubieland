import './Separator.scss';

interface SeparatorProps {
  width?: number;
}

const Separator = ({ width = 90 }: SeparatorProps) => {
  return <div className="separator" style={{ width: `${width}%` }}></div>;
};

export default Separator;
