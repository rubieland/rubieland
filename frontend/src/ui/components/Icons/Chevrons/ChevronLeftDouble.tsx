import { SVGProps } from 'react';

const ChevronLeftDouble = ({
  width = '1em',
  height = '1em',
  fill = 'currentColor',
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={fill}
      d="M12.677 19.538a.75.75 0 1 0 1.046-1.076l-1.046 1.076ZM6 12l-.523-.538a.75.75 0 0 0 0 1.076L6 12Zm7.723-6.462a.75.75 0 1 0-1.046-1.076l1.046 1.076Zm3.754 12.833a.75.75 0 0 0 1.046-1.076l-1.046 1.076ZM12 12l-.523-.538a.75.75 0 0 0 0 1.076L12 12Zm6.523-5.295a.75.75 0 1 0-1.046-1.076l1.046 1.076Zm-4.8 11.757-7.2-7-1.046 1.076 7.2 7 1.046-1.076Zm-7.2-5.924 7.2-7-1.046-1.076-7.2 7 1.046 1.076Zm12 4.757-6-5.833-1.046 1.076 6 5.833 1.046-1.076Zm-6-4.757 6-5.833-1.046-1.076-6 5.833 1.046 1.076Z"
    />
  </svg>
);
export default ChevronLeftDouble;
