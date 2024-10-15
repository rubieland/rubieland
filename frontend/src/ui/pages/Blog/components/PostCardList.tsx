import { Post } from '../../../../models/posts/post.entity';
import { useTranslation } from 'react-i18next';
import '../styles/PostCardList.scss';
import PostCard from './PostCard';

interface PostCardListProps {
  posts: Post[];
}

const PostCardList = ({ posts }: PostCardListProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.blog' });

  // TODO: add pagination when InfiniteQuery is implemented

  return (
    <section className="post-card-list-container">
      <div className="post-card-list">
        {posts.map((post, i) => (
          <PostCard
            date={t('postCard.date', { date: new Date(post.createdAt) })}
            imageUrl={post.picture}
            content={post.content}
            title={post.title}
            postId={post.id}
            key={i}
          />
        ))}
      </div>
    </section>
  );
};

export default PostCardList;
