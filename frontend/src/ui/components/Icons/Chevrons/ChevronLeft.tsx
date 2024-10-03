import colors from '../../../../assets/styles/colors';
import { SVGProps } from 'react';

const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
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
      d="m15 6-6 6 6 6"
    />
  </svg>
);
export default ChevronLeft;
