import { refreshAccessToken } from './api/auth/refreshAccessToken';
import PageLoader from './ui/components/Loader/PageLoader';
import { RouterProvider } from '@tanstack/react-router';
import { useEffect } from 'react';
import { router } from './router';
import {
  useIsConnected,
  useSessionStore,
  useSessionStoreActions,
} from './stores/SessionStore';
import { useGetProfile } from './api/user/getProfile';

// DOCS: Tanstack router tutorials => https://www.youtube.com/watch?v=4sslBg8LprE&list=PLOQjd5dsGSxJilh0lBofeY8Qib98kzmF5&index=1
const InnerApp = () => {
  const { resetSession, setIsSessionLoading } = useSessionStoreActions();
  const { isAdmin, isSessionLoading } = useSessionStore();
  const isConnected = useIsConnected();
  const { isLoading } = useGetProfile({
    config: { enabled: isConnected },
  });

  // for security purposes, we do not persist access token in local storage or session storage
  // so we have to restore session with a new access token each time user reloads
  useEffect(() => {
    const restoreSession = async () => {
      try {
        setIsSessionLoading(true);
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          resetSession();
        }
      } catch (error) {
        resetSession();
      } finally {
        setIsSessionLoading(false);
      }
    };

    restoreSession();
  }, [resetSession, setIsSessionLoading]);

  if (isSessionLoading || isLoading) {
    return <PageLoader isLoading={isSessionLoading || isLoading} />;
  }

  return <RouterProvider router={router} context={{ isConnected, isAdmin }} />;
};

export const App = () => {
  return <InnerApp />;
};

export default App;
