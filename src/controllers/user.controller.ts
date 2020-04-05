import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import authService from '../services/auth.service';
import { ResponseInterface } from '../helpers/types';
import UserInterface, { GetUserType } from '../types/user';

import queries from '../queries';
const { UserQuery } = queries;

export default class userController {
  static async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { id } = req.params;

      const user = await UserQuery.findOne<GetUserType, UserInterface>({
        _id: id
      });

      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json(
          sendResponse(httpStatus.NOT_FOUND, 'user not found', null, {
            user: 'user not found'
          })
        );
      }

      const token = await authService.issue(user.toJSON());

      return res
        .status(httpStatus.FOUND)
        .json(sendResponse(httpStatus.FOUND, 'success', user, null, token));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const users = await UserQuery.findAll<object, UserInterface>({});

      return res
        .status(httpStatus.OK)
        .json(sendResponse(httpStatus.OK, 'success', users));
    } catch (error) {
      next(error);
    }
  }
}
