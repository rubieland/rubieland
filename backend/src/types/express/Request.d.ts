import { AuthUser } from '../AuthUser';

declare global {
  namespace Express {
    export interface Request {
      // add properties here if need to extend Express Request interface
      authUser: AuthUser;
    }
  }
}
