import { Document } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  isPublished: boolean;
  picture?: string | null;
}

export type PostData = Omit<IPost, 'isPublished'> & {
  isPublished: string;
};

export type PostField = keyof Omit<IPost, 'picture'>;
export interface PostDocument extends IPost, Document {}
