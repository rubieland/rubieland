import colors from '../../../assets/styles/colors';
import { SVGProps } from 'react';

const ImageCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 24}
    height={props.width || 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke={props.color || colors.black}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13.647 16.375-1.551-1.413c-.76-.693-1.141-1.039-1.572-1.17a2 2 0 0 0-1.165 0c-.431.131-.812.477-1.572 1.17L4.92 17.558m8.727-1.183.316-.288c.76-.693 1.141-1.039 1.572-1.17a2 2 0 0 1 1.165 0c.431.131.812.477 1.572 1.17l1.152 1.003m-5.777-.715 3.4 3.078M17 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
export default ImageCircle;
