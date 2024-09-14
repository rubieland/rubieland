import { refreshAccessToken } from './api/auth/refreshAccessToken';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { router } from './router';
import {
  useIsConnected,
  useSessionStore,
  useSessionStoreActions,
} from './stores/SessionStore';

// DOCS: Tanstack router tutorials => https://www.youtube.com/watch?v=4sslBg8LprE&list=PLOQjd5dsGSxJilh0lBofeY8Qib98kzmF5&index=1
const InnerApp = () => {
  const { logout } = useSessionStoreActions();
  const { isAdmin } = useSessionStore();
  const isConnected = useIsConnected();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          logout();
        }
      } catch (error) {
        logout();
      }
    };

    restoreSession();
  }, [logout]);

  return <RouterProvider router={router} context={{ isConnected, isAdmin }} />;
};

export const App = () => {
  return <InnerApp />;
};

export default App;
