import { SVGProps } from 'react';

const ChevronDown = ({
  width = '1em',
  height = '1em',
  fill = 'none',
  stroke = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 9 6 6 6-6"
    />
  </svg>
);
export default ChevronDown;
