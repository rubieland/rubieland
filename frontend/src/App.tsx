import { Link, Outlet } from '@tanstack/react-router';

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
      <h1>Rubieland</h1>
      <button className="btn">Button</button>
      <button className="success-btn">Button</button>
      <button className="error-btn">Button</button>
      <button className="disabled-btn">Button</button>

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
