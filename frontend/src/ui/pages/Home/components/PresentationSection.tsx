import PresentationImageColumn from './PresentationImageColumn';
import PresentationTextColumn from './PresentationTextColumn';
import '../styles/PresentationSection.scss';

const PresentationSection = () => {
  return (
    <section className="presentation-section">
      <article className="presentation-content">
        <PresentationTextColumn />
        <PresentationImageColumn />
      </article>
    </section>
  );
};

export default PresentationSection;
