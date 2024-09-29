import { z } from 'zod';

const UserDtoSchema = z.object({
  _id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string(),
  avatar: z.string().nullable(),
  phone: z.string(),
  role: z.enum(['user', 'admin']).default('user'),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
