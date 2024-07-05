import { AuthUser } from '../AuthUser';

declare module 'express-session' {
  export interface SessionData {
    authUser: AuthUser;
    token: string;
  }
}
