import { PostDto } from './post.dto';

export type Post = {
  id: string;
  title: string;
  content: string;
  picture: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PostBody = {
  title: string;
  content: string;
  picture: string | null;
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
