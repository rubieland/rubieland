import { NavbarProvider } from './ui/components/Navbar/providers/NavbarProvider';
import CustomButton from './ui/components/Button/CustomButton';
import FormTests from './ui/components/FormTests/FormTests';
import Navbar from './ui/components/Navbar/Navbar';
import { Outlet } from '@tanstack/react-router';

// DOCS: Tanstack router tutorials => https://www.youtube.com/watch?v=4sslBg8LprE&list=PLOQjd5dsGSxJilh0lBofeY8Qib98kzmF5&index=1

export const App = () => {
  // TODO: use Navbar when it's ready
  return (
    <>
      <NavbarProvider>
        <Navbar />
      </NavbarProvider>

      <h1>Rubieland</h1>
      <CustomButton title="Button" onClick={() => console.log('clicked')} />
      <CustomButton
        onClick={() => console.log('clicked')}
        title="Button"
        style="success"
      />
      <CustomButton
        onClick={() => console.log('clicked')}
        title="Button"
        style="error"
      />
      <CustomButton
        onClick={() => console.log('clicked')}
        title="Button"
        isDisabled={true}
      />

      {/* TODO: remove <FormTests /> when first form is ready  */}
      <FormTests />

      {/* <input type="checkbox" className="checkbox" />
      <textarea
        className="textarea"
        cols={20}
        rows={2}
        placeholder="Décrivez-nous votre toutou en quelques lignes..."
      ></textarea>
      <select className="select">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select> */}

      <Outlet />
    </>
  );
};

export default App;
