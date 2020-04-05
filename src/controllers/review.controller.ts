import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { ResponseInterface } from '../helpers/types';
import ReviewInterface, {
  ReviewType,
  ProductReviewType
} from '../types/review';

import queries from '../queries';
const { ReviewQuery } = queries;

export default class reviewController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const review = await ReviewQuery.create<ReviewType, ReviewInterface>({
        ...req.body
      });

      return res
        .status(httpStatus.CREATED)
        .json(sendResponse(httpStatus.CREATED, 'success', review));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { productId } = req.params;

      const reviews = await ReviewQuery.findAll<
        ProductReviewType,
        ReviewInterface
      >({ productId });

      return res
        .status(httpStatus.OK)
        .json(sendResponse(httpStatus.OK, 'success', reviews));
    } catch (error) {
      next(error);
    }
  }
}
