import { Document } from 'mongoose';

export interface IBlogArticle {
  title: string;
  content: string;
  isPublished: boolean;
  picture?: string | null;
}

export type BlogArticleData = Omit<IBlogArticle, 'isPublished'> & {
  isPublished: string;
};

export type BlogArticleField = keyof Omit<IBlogArticle, 'picture'>;
export interface BlogArticleDocument extends IBlogArticle, Document {}
