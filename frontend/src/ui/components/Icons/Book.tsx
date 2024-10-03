import { SVGProps } from 'react';
import colors from '../../../assets/styles/colors';

const Book = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 25}
    height={props.width || 25}
    stroke={props.stroke || colors.grey80}
    fill="none"
    viewBox="0 -0.5 25 25"
    {...props}
  >
    <path
      stroke={props.stroke || colors.grey80}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.25 17.359a2.353 2.353 0 0 1-2.749-2.17V8.029A1.735 1.735 0 0 1 6.633 6.33a5.38 5.38 0 0 1 5.868 1.469v10.22c-.985-.827-2.687-.877-4.252-.66ZM16.753 17.359a2.353 2.353 0 0 0 2.748-2.17V8.029A1.735 1.735 0 0 0 18.37 6.33a5.38 5.38 0 0 0-5.868 1.469v10.22c.985-.827 2.687-.877 4.252-.66Z"
      clipRule="evenodd"
    />
    <path
      fill={props.fill || colors.grey80}
      d="M10.001 11.77a.75.75 0 1 0 0-1.5v1.5Zm-2-1.5a.75.75 0 0 0 0 1.5v-1.5Zm2 3.5a.75.75 0 1 0 0-1.5v1.5Zm-2-1.5a.75.75 0 0 0 0 1.5v-1.5Zm9-.5a.75.75 0 1 0 0-1.5v1.5Zm-2-1.5a.75.75 0 0 0 0 1.5v-1.5Zm2 3.5a.75.75 0 1 0 0-1.5v1.5Zm-2-1.5a.75.75 0 0 0 0 1.5v-1.5Zm-5-2h-2v1.5h2v-1.5Zm0 2h-2v1.5h2v-1.5Zm7-2h-2v1.5h2v-1.5Zm0 2h-2v1.5h2v-1.5Z"
    />
  </svg>
);
export default Book;

/*



*/
