import { Document } from 'mongoose';

export interface BlogArticle {
  title: string;
  content: string;
  isPublished: boolean;
  picture: string;
}

export interface BlogArticleDocument extends BlogArticle, Document {}
