import { BlogArticleDto } from './blogArticle.dto';

export type BlogArticle = {
  id: string;
  title: string;
  content: string;
  picture: string | null;
  isPublished: boolean;
};

export const convertBlogArticleDtoToEntity = (
  dto: BlogArticleDto,
): BlogArticle => {
  return { ...dto, id: dto._id };
};
