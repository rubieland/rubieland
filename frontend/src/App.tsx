import { Link, Outlet } from '@tanstack/react-router';
import './App.css';

// DOCS: Tanstack router tutorials => https://www.youtube.com/watch?v=4sslBg8LprE&list=PLOQjd5dsGSxJilh0lBofeY8Qib98kzmF5&index=1

export const App = () => {
  const activeProps = {
    style: {
      color: 'red',
      fontWeight: 'bold',
    },
  };

  // TODO: use Navbar when it's ready
  return (
    <>
      <ul>
        <li>
          <Link to="/" activeProps={activeProps}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" activeProps={activeProps}>
            About
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default App;
