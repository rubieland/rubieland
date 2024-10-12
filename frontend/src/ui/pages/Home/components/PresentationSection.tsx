import imgSrc from '../../../../assets/illustrations/happy-dog.jpg';
import { Link } from '@tanstack/react-router';
import '../styles/PresentationSection.scss';
import { t } from 'i18next';

const PresentationSection = () => {
  return (
    <section className="presentation-section">
      <div className="presentation-content">
        <div className="text-column">
          {/* TODO: Add i18n translation and replace the title and paragraphs texts */}
          <h2>Bienvenue chez Rubieland</h2>
          <p>
            Rubieland, c'est la garderie où votre compagnon à quatre pattes se
            sentira comme chez lui. Que ce soit pour une journée ou un séjour
            plus long, nos services sont conçus pour garantir le bien-être de
            vos chiens. Nos infrastructures sont pensées pour offrir un
            environnement ludique et sécurisé.
          </p>
          <p>
            Nous croyons en un accompagnement personnalisé pour chaque chien,
            avec des activités adaptées à leurs besoins et à leurs envies.
            Faites-nous confiance pour prendre soin de vos compagnons avec tout
            l'amour qu'ils méritent.
          </p>
          <Link className="read-more-btn btn btn-primary" to="/about">
            {t('common.readMore')}
          </Link>
        </div>

        <div className="image-column">
          <img
            src={imgSrc}
            // TODO: Replace alt text
            alt="Chien heureux à Rubieland"
          />
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
