import config from '../config';
import jwt from 'jsonwebtoken';
import { UserTokenType } from '../types/user';

export default class authService {
  public static issue(payload: UserTokenType): Promise<string> {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: config.jwtExpirationInterval },
        (err, decoded) => {
          if (err) return reject(err);
          return resolve(decoded);
        }
      )
    );
  }

  public static verify(token: string): Promise<any> {
    return new Promise((resolve, reject) =>
      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) return reject(err);
        return resolve(decoded);
      })
    );
  }
}
