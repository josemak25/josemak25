import { UserTokenType } from '../user';

declare global {
  export namespace Express {
    interface Request {
      token: UserTokenType;
    }
  }
}
