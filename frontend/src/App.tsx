import { Link, Outlet } from '@tanstack/react-router';
import CustomButton from './ui/components/Button/CustomButton';

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
      <CustomButton text="Button" onClick={() => console.log('clicked')} />
      <CustomButton
        text="Button"
        onClick={() => console.log('clicked')}
        type="success"
      />
      <CustomButton
        text="Button"
        onClick={() => console.log('clicked')}
        type="error"
      />
      <CustomButton
        text="Button"
        onClick={() => console.log('clicked')}
        type="disabled"
      />
      <input type="text" className="input" />

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
