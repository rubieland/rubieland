import { AuthUser } from '../AuthUser';

declare global {
  namespace Express {
    export interface Request {
      authUser: AuthUser;
    }
  }
}
