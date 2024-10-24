interface AboutSectionProps {
  title: string;
  content: string;
}

const AboutSection = ({ title, content }: AboutSectionProps) => {
  return (
    <section className="about-section">
      <h3>{title}</h3>
      <div className="about-section-content">
        <p>{content}</p>
      </div>
    </section>
  );
};

export default AboutSection;
