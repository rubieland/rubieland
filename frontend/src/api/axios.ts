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

// axios interceptors are kind of "client side middlewares",
// and this one checks before each request is sent to api if the access token from store is still valid and not expired
// before setting headers.Authorization with the Bearer {access token}.
// if it is expired, it calls /auth/refresh-token endpoint to refresh it, then sets authorization headers with
// the refreshed token we just received from /auth/refresh-token
api.interceptors.request.use(async (config) => {
  // retrive access token state and logout action from SessionStore
  const {
    accessToken,
    actions: { logout },
  } = useSessionStore.getState();

  // we exclude /auth/refresh-token endpoint because it already checks access token validity and expiration
  // and already refreshes the token if invalid or expired, so it would turn into infinite loop of token refreshing
  if (accessToken && config.url !== '/auth/refresh-token') {
    // we verify token's validity first
    const isTokenValid = await testIfJwtTokenIsValid(accessToken);

    // it invalid, we call /auth/refresh-token endpoint to refresh it
    if (!isTokenValid) {
      try {
        const refreshedToken = await refreshAccessToken();

        if (!refreshedToken) {
          throw new Error(
            '[Axios request interceptors] Refresh token is undefined',
          );
        }
        // and we set headers.Authorization with the newly refreshed token
        config.headers.Authorization = `Bearer ${refreshedToken}`;
        console.log('Token is refreshed');
      } catch (error: unknown) {
        // if an error occurs during refreshing, logout user
        console.error(
          '[Axios request interceptors] Logout user after an error while refreshing token',
          error,
        );

        // TODO: add api call to /auth/logout
        logout();
        queryClient.removeQueries();
      }
    } else {
      // if the access token in store is still valid, we send it through headers.Authorization
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export { api };
