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

export const convertPostDtoToEntity = (dto: PostDto): Post => {
  return { ...dto, id: dto._id };
};
