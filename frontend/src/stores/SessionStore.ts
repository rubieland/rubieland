import { SessionData, User } from '../models/user/user.entity';
import { create } from 'zustand';

type SessionStoreStateType = {
  token: string | null | undefined;
  user: User | null;
  actions: {
    setSession: ({ token, user }: SessionData) => void;
    setUser: ({ user }: SessionData) => void;
    logout: () => void;
  };
};

export const useSessionStore = create<SessionStoreStateType>((set) => ({
  token: null,
  user: null,
  actions: {
    setSession: ({ token, user }) =>
      set((state) => {
        return {
          ...state,
          token,
          user,
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
        token: null,
        user: null,
      })),
  },
}));

export const useIsConnected = () => useSessionStore((state) => !!state.token);
export const useSession = () =>
  useSessionStore((state) => ({ token: state.token }));
export const useSessionStoreActions = () =>
  useSessionStore((state) => state.actions);
export const useUserInfo = () => useSessionStore((state) => state.user);
