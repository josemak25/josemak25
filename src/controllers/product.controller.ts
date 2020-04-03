import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { ResponseInterface } from '../helpers/types';
import ProductInterface, {
  ProductType,
  ProductExitsType
} from '../types/product';

import queries from '../queries';
const { ProductQuery } = queries;

export default class productController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { name }: ProductType = req.body;

      const productExits = await ProductQuery.findOne<
        ProductExitsType,
        ProductInterface
      >({ name });

      if (productExits) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(sendResponse(httpStatus.BAD_REQUEST, 'product already exists'));
      }

      const product = await ProductQuery.create<ProductType, ProductInterface>({
        ...req.body
      });

      return res
        .status(httpStatus.CREATED)
        .json(sendResponse(httpStatus.CREATED, 'success', product));
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
      const products = await ProductQuery.findAll<object, ProductInterface>({});

      return res
        .status(httpStatus.OK)
        .json(sendResponse(httpStatus.OK, 'success', products));
    } catch (error) {
      next(error);
    }
  }
}
