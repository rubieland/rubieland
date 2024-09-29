import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import {
  BlogArticle,
  convertBlogArticleDtoToEntity,
} from '../../models/blogArticles/blogArticle.entity';
import { QueryKeysEnum } from '../../enums/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

export const getAllBlogArticles = async (): Promise<BlogArticle[]> => {
  const response = await api.get(`/blog/articles/all`);
  const blogArticles = response.data.articles;

  return blogArticles.map(convertBlogArticleDtoToEntity);
};

type QueryFnType = typeof getAllBlogArticles;

type UseGetAllBlogArticlesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllBlogArticles = ({
  config,
}: UseGetAllBlogArticlesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QueryKeysEnum.BLOG_ARTICLES],
    queryFn: () => getAllBlogArticles(),
  });
};
