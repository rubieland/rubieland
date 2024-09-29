import { ExtractFnReturnType, QueryConfig } from '../reactQuery';
import {
  BlogArticle,
  convertBlogArticleDtoToEntity,
} from '../../models/blogArticles/blogArticle.entity';
import { useQuery } from '@tanstack/react-query';
import { api } from '../axios';

export const getAllBlogArticles = async (): Promise<BlogArticle[]> => {
  const response = await api.get(`/blog/articles/all`);
  const blogArticles = response.data.articles;

  return blogArticles.map(convertBlogArticleDtoToEntity);
};

type QueryFnType = typeof getAllBlogArticles;

type UseGetBlogAllArticlesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetAllBlogArticles = ({
  config,
}: UseGetBlogAllArticlesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['blogArticles'],
    queryFn: () => getAllBlogArticles(),
  });
};
