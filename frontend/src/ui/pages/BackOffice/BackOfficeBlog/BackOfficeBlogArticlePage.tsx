import { useParams } from '@tanstack/react-router';

const BackOfficeBlogArticlePage = () => {
  const { articleId } = useParams({ strict: false });
  console.log(articleId);

  return (
    <div>
      <p>Article {articleId}</p>
    </div>
  );
};

export default BackOfficeBlogArticlePage;
