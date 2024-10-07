import { SVGProps } from 'react';

const CirclePlus = ({
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
      d="M8 12h8m-4-4v8m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
export default CirclePlus;
