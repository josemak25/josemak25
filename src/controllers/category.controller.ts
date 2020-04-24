import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { ResponseInterface } from '../helpers/types';
import CategoryInterface, { CategoryType } from '../types/category';

import queries from '../queries';
const { CategoryQuery } = queries;

export default class categoryController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const category = await CategoryQuery.create<
        CategoryType,
        CategoryInterface
      >({
        ...req.body
      });

      return res
        .status(httpStatus.CREATED)
        .json(sendResponse(httpStatus.CREATED, 'success', category));
    } catch (error) {
      next(error);
    }
  }
}
