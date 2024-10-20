import { UserDto } from './user.dto';

export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  phone: string;
  role: UserRole;
};

export type RegisterBody = Omit<User, 'id' | 'role' | 'avatar'> & {
  password: string;
  confirmPassword: string;
};

export type LoginBody = Pick<RegisterBody, 'email' | 'password'>;

export type UpdateProfileBody = Omit<User, 'id' | 'role' | 'avatar'> & {
  avatar?: File | string | null;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

export type SessionData = {
  accessToken: string | null | undefined;
  user: User | null;
};

export const convertUserDtoToEntity = (dto: UserDto): User => {
  return {
    id: dto._id,
    email: dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    avatar: dto.avatar,
    phone: dto.phone,
    role: dto.role,
  };
};
