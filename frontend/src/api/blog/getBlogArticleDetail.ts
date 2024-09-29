import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import {
  BlogArticle,
  convertBlogArticleDtoToEntity,
} from '../../models/blogArticles/blogArticle.entity';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

export const getBlogArticleDetail = async (
  articleId: string,
): Promise<BlogArticle> => {
  const response = await api.get(`/blog/articles/${articleId}`);
  const blogArticle = response.data.article;

  return convertBlogArticleDtoToEntity(blogArticle);
};

type QueryFnType = typeof getBlogArticleDetail;

type UseGetBlogArticleDetailOptions = {
  articleId: string;
  config?: QueryConfig<QueryFnType>;
};

export const GET_BLOG_ARTICLE_KEY = (id: string) => [
  QueryKeysEnum.BLOG_ARTICLE_DETAIL,
  { articleId: id },
];

export const useGetBlogArticleDetail = ({
  articleId,
  config,
}: UseGetBlogArticleDetailOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: GET_BLOG_ARTICLE_KEY(articleId),
    queryFn: () => getBlogArticleDetail(articleId),
  });
};
