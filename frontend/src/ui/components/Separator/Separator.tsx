import './Separator.scss';

interface SeparatorProps {
  width?: number;
  backgroundColor?: string;
}

const Separator = ({ width = 90, backgroundColor }: SeparatorProps) => {
  return (
    <div
      className="separator"
      style={{ width: `${width}%`, backgroundColor }}
    ></div>
  );
};

export default Separator;
