import { testIfJwtTokenIsValid } from '../helpers/token.helpers';
import { refreshAccessToken } from './auth/refreshAccessToken';
import { useSessionStore } from '../stores/SessionStore';
import { API_URL } from '../core/envConfig';
import { queryClient } from './reactQuery';
import Axios from 'axios';

const api = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 10000, // 10s
  withCredentials: false,
});

api.interceptors.request.use(async (config) => {
  const {
    accessToken,
    actions: { logout },
  } = useSessionStore.getState();

  let currentAccessToken = accessToken;

  if (accessToken && config.url !== '/auth/refresh-token') {
    const isTokenValid = await testIfJwtTokenIsValid(accessToken);

    if (!isTokenValid) {
      try {
        const refreshedToken = await refreshAccessToken();

        if (!refreshedToken) {
          throw new Error(
            '[Axios request interceptors] Refresh token is undefined',
          );
        }

        currentAccessToken = refreshedToken;
        config.headers.Authorization = `Bearer ${currentAccessToken}`;
        console.log('Token is refreshed');
      } catch (error: unknown) {
        console.error(
          '[Axios request interceptors] Logout user after an error while refreshing token',
          error,
        );

        logout();
        queryClient.removeQueries();
      }
    } else {
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }
  }
  return config;
});

export { api };
