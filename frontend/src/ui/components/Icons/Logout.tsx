import { SVGProps } from 'react';

const LogoutIcon = ({
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
      d="m17 16 4-4m0 0-4-4m4 4H9m4 9H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.875C3 19.48 3 18.92 3 17.8V6.2c0-1.12 0-1.68.218-2.107a2 2 0 0 1 .874-.874C4.52 3 5.08 3 6.2 3H13"
    />
  </svg>
);
export default LogoutIcon;
