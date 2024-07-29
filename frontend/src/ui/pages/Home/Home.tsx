import CustomButton from '../../components/Button/CustomButton';
import FormTests from '../../components/FormTests/FormTests';

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
