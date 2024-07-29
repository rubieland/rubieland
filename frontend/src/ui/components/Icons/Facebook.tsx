import { getAdaptableSize } from '../../../utils/icon.utils';
import { SVGProps } from 'react';

const originalHeight = 24;
const originalWidth = 24;

const Facebook = ({ width, ...props }: SVGProps<SVGSVGElement>) => {
  const { h, w } = getAdaptableSize({
    currentWidth: Number(width),
    originalHeight,
    originalWidth,
  });

  return (
    <svg
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      fill="none"
      {...props}
      height={h}
      width={w}
    >
      <path
        fill={props.color || '#000'}
        d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
      />
    </svg>
  );
};
export default Facebook;
