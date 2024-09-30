import { PostDto } from './post.dto';

export type Post = {
  id: string;
  title: string;
  content: string;
  picture: string | null;
  isPublished: boolean;
};

export const convertPostDtoToEntity = (dto: PostDto): Post => {
  return { ...dto, id: dto._id };
};
