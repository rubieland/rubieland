import { useSessionStore } from '../../stores/SessionStore';
import { postRefreshToken } from './postRefreshToken';

export const refreshAccessToken = async (): Promise<string | undefined> => {
  const {
    actions: { setSession },
  } = useSessionStore.getState();

  const { accessToken: newAccessToken, user: newUser } =
    await postRefreshToken();

  if (!newAccessToken) {
    throw new Error('Undefined values from refreshToken response');
  }

  setSession({
    accessToken: newAccessToken,
    user: newUser,
  });

  return newAccessToken;
};
