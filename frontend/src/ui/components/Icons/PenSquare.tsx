import { SVGProps } from 'react';

const PenSquare = ({
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
      d="M11 4H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C4 5.52 4 6.08 4 7.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C5.52 20 6.08 20 7.2 20h9.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C20 18.48 20 17.92 20 16.8v-4.3m-4.5-7 2.828 2.828m-7.565 1.91 6.648-6.649a2 2 0 1 1 2.828 2.828l-6.862 6.862c-.761.762-1.142 1.143-1.576 1.446-.385.269-.8.491-1.237.663-.492.194-1.02.3-2.076.514L8 16l.047-.332c.168-1.175.252-1.763.443-2.312a6 6 0 0 1 .69-1.377c.323-.482.743-.902 1.583-1.742Z"
    />
  </svg>
);
export default PenSquare;
