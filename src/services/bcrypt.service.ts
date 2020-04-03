import config from '../config';
import bcrypt from 'bcrypt';
import { UserType } from '../types/user';

export default class bcryptService {
  public static hashPassword(user: UserType): Promise<string> {
    const hash = bcrypt.genSaltSync(+config.bcryptRound);
    return bcrypt.hash(user.password, hash);
  }

  public static comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
