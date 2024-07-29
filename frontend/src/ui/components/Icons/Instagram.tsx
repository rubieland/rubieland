import { getAdaptableSize } from '../../../utils/icon.utils';
import { SVGProps } from 'react';

const originalHeight = 24;
const originalWidth = 24;

const Instagram = ({ width, ...props }: SVGProps<SVGSVGElement>) => {
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
        d="M12.001 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM12.001 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.408.15-.778.39-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058.782-.037 1.308-.142 1.797-.331a2.91 2.91 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08.19-.492.296-1.018.332-1.8.052-1.103.058-1.49.058-4.028 0-2.474-.007-2.878-.058-4.029-.037-.782-.143-1.31-.332-1.798a2.912 2.912 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06 1.064.05 1.79.217 2.427.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.884 4.884 0 0 1-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.427.465-1.067.047-1.406.06-4.123.06-2.717 0-3.056-.01-4.123-.06-1.064-.05-1.789-.218-2.427-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"
      />
    </svg>
  );
};
export default Instagram;
