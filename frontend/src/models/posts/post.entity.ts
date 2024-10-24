import { PostDto } from './post.dto';

export type ApiPostResponse = {
  message: string;
  post: PostDto;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  picture: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostBody = {
  title: string;
  content: string;
  picture: File | string | null;
  isPublished: boolean;
};

export const convertPostDtoToEntity = (dto: PostDto): Post => {
  return {
    id: dto._id,
    title: dto.title,
    content: dto.content,
    picture: dto.picture,
    isPublished: dto.isPublished,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
};
