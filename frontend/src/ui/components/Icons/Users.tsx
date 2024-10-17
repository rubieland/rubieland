import { SVGProps } from 'react';

const Users = ({
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
      d="M13 20v-2a5 5 0 0 0-10 0v2h10Zm0 0h8v-1c0-2.945-2.239-5-5-5-1.413 0-2.69.626-3.6 1.631M11 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </svg>
);
export default Users;
