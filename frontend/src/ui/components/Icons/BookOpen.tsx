import { SVGProps } from 'react';

const BookOpen = ({
  width = '1em',
  height = '1em',
  stroke = 'currentColor',
  fill = 'none',
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
      d="M12 10.4V20m0-9.6c0-2.24 0-3.36-.436-4.216a4 4 0 0 0-1.748-1.748C8.96 4 7.84 4 5.6 4h-1c-.56 0-.84 0-1.054.109a1 1 0 0 0-.437.437C3 4.76 3 5.04 3 5.6v10.8c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 18 4.04 18 4.6 18h2.947c.54 0 .81 0 1.071.047.232.04.458.11.674.204.243.106.468.255.917.555L12 20m0-9.6c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C15.04 4 16.16 4 18.4 4h1c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C21 4.76 21 5.04 21 5.6v10.8c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C20.24 18 19.96 18 19.4 18h-2.947c-.54 0-.81 0-1.071.047-.232.04-.458.11-.674.204-.243.106-.468.255-.917.555L12 20"
    />
  </svg>
);

export default BookOpen;
