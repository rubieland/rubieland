import { ReqUser } from '../ReqUser';

declare global {
  namespace Express {
    export interface Request {
      user: ReqUser;
    }
  }
}
