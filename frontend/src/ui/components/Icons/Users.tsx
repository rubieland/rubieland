import { SVGProps } from 'react';

const Users = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 25}
    height={props.width || 25}
    fill="none"
    viewBox="0 -0.5 25 25"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 7.333a2.333 2.333 0 1 1-4.666 0 2.333 2.333 0 0 1 4.666 0ZM14.833 15.733c0 1.8-2.089 3.267-4.667 3.267S5.5 17.537 5.5 15.733c0-1.804 2.089-3.266 4.667-3.266s4.666 1.462 4.666 3.266ZM17.439 9.511a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z"
      clipRule="evenodd"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.7 18.067a2.6 2.6 0 0 0 2.8-2.334 2.6 2.6 0 0 0-2.8-2.333"
    />
  </svg>
);
export default Users;
