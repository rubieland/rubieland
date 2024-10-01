import { Post } from '../../../../models/posts/post.entity';
import { useTranslation } from 'react-i18next';
import '../styles/PostCardList.scss';
import PostCard from './PostCard';

interface PostCardListProps {
  posts: Post[];
}

const PostCardList = ({ posts }: PostCardListProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.blog' });
  return (
    <section className="post-card-list-container">
      <h3>{t('allPosts')}</h3>
      <div className="post-card-list">
        {posts.map((post, i) => (
          <PostCard
            key={i}
            title={post.title}
            imageUrl={post.picture}
            excerpt={`${post.content.substring(0, 100)}...`}
            date={t('postCard.date', { date: new Date(post.createdAt) })}
          />
        ))}
      </div>
    </section>
  );
};

export default PostCardList;
