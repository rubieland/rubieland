import { z } from 'zod';

const PostDtoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  picture: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});

export type PostDto = z.infer<typeof PostDtoSchema>;
