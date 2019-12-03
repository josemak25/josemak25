import config from "../config/env";
import jwt from "jsonwebtoken";

export default class authService {
  static issue(payload: any) {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpirationInterval
    });
  }

  static verify(token: any) {
    return jwt.verify(token, config.jwtSecret, {});
  }
}
