import colors from '../../../assets/styles/colors';
import { SVGProps } from 'react';

const DefaultAvatar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 24}
    height={props.width || 24}
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill={props.color || colors.black}
      d="M8 1a3 3 0 1 0 .002 6.002A3 3 0 0 0 8 1zM6.5 8A4.491 4.491 0 0 0 2 12.5v.5c0 1.11.89 2 2 2h8c1.11 0 2-.89 2-2v-.5C14 10.008 11.992 8 9.5 8zm0 0"
    />
  </svg>
);
export default DefaultAvatar;
