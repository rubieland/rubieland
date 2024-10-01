import defaultImg from '../../../../assets/illustrations/blog_default_img_350x200.png';
import '../styles/PostCard.scss';

interface PostCardProps {
  imageUrl: string | null;
  excerpt: string;
  title: string;
  date: string;
}

const PostCard = ({ title, excerpt, date, imageUrl }: PostCardProps) => {
  return (
    <article className="post-card">
      <div className="post-card-image-container">
        <img
          src={defaultImg}
          alt={`Image - ${title}`}
          className="post-card-image"
        />
      </div>

      <div className="post-card-content">
        <h3 className="post-card-title">{title}</h3>
        <p className="post-card-excerpt">{excerpt}</p>
        <footer className="post-card-footer">
          <span className="post-card-date">{date}</span>
          <span className="post-card-read-more">Read more</span>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;
