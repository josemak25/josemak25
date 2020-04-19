import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import authService from '../services/auth.service';
import { ResponseInterface } from '../helpers/types';
import UserInterface, { UserType, UserExitsType } from '../types/user';
import getUserDefaultAvatar from '../helpers/get_user_avatar';

import queries from '../queries';
const { UserQuery } = queries;

export default class authController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { phone }: UserType = req.body;

      const userExits = await UserQuery.findOne<UserExitsType, UserInterface>({
        phone
      });

      if (userExits) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            sendResponse(
              httpStatus.BAD_REQUEST,
              'account already registered with us'
            )
          );
      }

      const avatar = await getUserDefaultAvatar(req.body);

      const user = await UserQuery.create<UserType, UserInterface>({
        ...req.body,
        ...avatar
      });

      return res
        .status(httpStatus.CREATED)
        .json(sendResponse(httpStatus.CREATED, 'success', user));
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { phone }: UserType = req.body;

      const userExits = await UserQuery.findOne<UserExitsType, UserInterface>({
        phone
      });

      if (!userExits) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            sendResponse(
              httpStatus.BAD_REQUEST,
              'account not registered with us'
            )
          );
      }

      const token = await authService.issue(userExits.toJSON());

      return res
        .status(httpStatus.OK)
        .json(sendResponse(httpStatus.OK, 'success', userExits, null, token));
    } catch (error) {
      next(error);
    }
  }
}
