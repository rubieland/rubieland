import Axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../core/envConfig';

enum SecuredEndpoints {
  PROFILE = '/profile',
  BACK_OFFICE = '/back-office',
}

const api = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 10000, // 10s
  withCredentials: false,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // send credentials only to secured routes
    if (
      config.url?.includes(SecuredEndpoints.PROFILE) ||
      config.url?.includes(SecuredEndpoints.BACK_OFFICE)
    ) {
      config.withCredentials = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        /**
         * TODO: 
         * const {
            accessToken,
            actions: { logout },
        } = useSessionStore.getState();

        if (accessToken) {
            const isTokenValid = await testIfJwtTokenIsValid(accessToken);

            if (!isTokenValid) {
            logout();
            queryClient.removeQueries();
            }
        }
         */
      }
    } else if (error.request) {
      // request has been sent but no response has been returned from server
      console.error('Request error:', error.message);
    } else {
      // request config error
      console.error('Configuration error:', error.message);
    }
    return Promise.reject(error);
  },
);

export { api };
