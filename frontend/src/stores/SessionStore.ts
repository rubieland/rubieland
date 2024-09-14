import { SessionData, User } from '../models/user/user.entity';
import { create } from 'zustand';

type SessionStoreStateType = {
  accessToken: string | null | undefined;
  user: User | null;
  isAdmin: boolean;
  actions: {
    setSession: ({ accessToken, user }: SessionData) => void;
    setUser: ({ user }: Pick<SessionData, 'user'>) => void;
    logout: () => void;
  };
};

export const useSessionStore = create<SessionStoreStateType>((set) => ({
  accessToken: null,
  user: null,
  isAdmin: false,
  actions: {
    setSession: ({ accessToken, user }) =>
      set((state) => {
        return {
          ...state,
          accessToken,
          user,
          isAdmin: user?.role === 'admin',
        };
      }),
    setUser: ({ user }) =>
      set((state) => {
        return {
          ...state,
          user,
        };
      }),
    logout: () =>
      set((state) => ({
        ...state,
        accessToken: null,
        user: null,
        isAdmin: false,
      })),
  },
}));

export const useIsConnected = () =>
  useSessionStore((state) => !!state.accessToken);
export const useAccessToken = () =>
  useSessionStore((state) => ({ accessToken: state.accessToken }));
export const useSessionStoreActions = () =>
  useSessionStore((state) => state.actions);
export const useUserInfo = () => useSessionStore((state) => state.user);
export const useIsAdmin = () => useSessionStore((state) => state.isAdmin);
