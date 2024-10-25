import { z } from 'zod';

const UserDtoSchema = z.object({
  _id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().nullable(),
  phone: z.string(),
  role: z.enum(['user', 'admin']).default('user'),
  createdAt: z.date(),
  updatedAt: z.date(),
  __v: z.number(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
