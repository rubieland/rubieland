import { z } from 'zod';

const BlogArticleDtoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  picture: z.string().nullable(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BlogArticleDto = z.infer<typeof BlogArticleDtoSchema>;
