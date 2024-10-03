import { SVGProps } from 'react';
import colors from '../../../../assets/styles/colors';

const ChevronLeftDouble = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    stroke={props.color || colors.black}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 17-5-5 5-5m-7 10-5-5 5-5"
    />
  </svg>
);
export default ChevronLeftDouble;
