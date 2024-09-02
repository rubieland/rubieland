import { UserDto } from './user.dto';

export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  avatar: string | null;
  phone: string;
  role: UserRole;
};

export type RegisterBody = Omit<User, 'id' | 'role' | 'avatar'> & {
  password: string;
  confirmPassword: string;
};

export type LoginBody = Pick<RegisterBody, 'email' | 'password'>;

export const convertUserDtoToEntity = (dto: UserDto): User => {
  return { ...dto };
};
