import { SVGProps } from 'react';

const Language = ({
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
      d="M20 6H4m8-2v2M8.096 9.98c.479 1.574 1.412 4.117 4.048 6.414m0 0C13.726 17.773 15.92 19.062 19 20m-6.856-3.606C15.239 13.246 17.069 8.77 17.069 6m-4.925 10.394C10.21 18.36 7.784 19.808 5 20"
    />
  </svg>
);
export default Language;
