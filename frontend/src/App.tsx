import { Link, Outlet } from '@tanstack/react-router';
import CustomButton from './ui/components/Button/CustomButton';
import FormInput from './ui/components/FormInputs/FormInput';
import { ChangeEvent, useState } from 'react';

// DOCS: Tanstack router tutorials => https://www.youtube.com/watch?v=4sslBg8LprE&list=PLOQjd5dsGSxJilh0lBofeY8Qib98kzmF5&index=1

export const App = () => {
  const activeProps = {
    style: {
      color: 'red',
      fontWeight: 'bold',
    },
  };

  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const nameRegex: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/i;

  const error = !nameRegex.test(value)
    ? 'Le champ prénom est invalide'
    : undefined;

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
      <FormInput
        label="Prénom"
        name="firstName"
        placeholder="Prénom"
        value={value}
        error={error}
        onChange={handleChange}
      />
      <p>Value: {value} </p>
      <input type="checkbox" className="checkbox" />
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
      </select>

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
