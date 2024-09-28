import { api } from '../axios';

export const postRefreshToken = async () => {
  const result = await api.post(
    '/auth/refresh-token',
    {},
    { withCredentials: true },
  );

  return result.data;
};
