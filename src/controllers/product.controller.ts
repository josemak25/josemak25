import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import Product from '../models/product.model';
import sendResponse from '../helpers/response';
import { ResponseInterface } from '../helpers/types';
import ProductInterface, {
  ProductType,
  ProductExitsType,
  ProductQueryType
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { skip, limit }: ProductQueryType = req.query;

      const products = await Product.aggregate<ProductInterface>([
        {
          $lookup: {
            localField: '_id',
            from: 'images',
            foreignField: 'referenceId',
            as: 'images'
          }
        },
        { $unwind: '$images' },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            description: { $first: '$description' },
            price: { $first: '$price' },
            quantity: { $first: '$quantity' },
            totalStock: { $sum: '$totalStock' },
            isDeleted: { $first: '$isDeleted' },
            rating: { $sum: '$rating' },
            brandId: { $first: '$brandId' },
            categoryId: { $first: '$categoryId' },
            discountId: { $first: '$discountId' },
            tagId: { $first: '$tagId' },
            images: {
              $push: {
                id: '$images._id',
                productId: '$images.referenceId',
                url: '$images.url',
                thumbnailUrl: '$images.thumbnailUrl',
                createdAt: '$images.createdAt',
                updatedAt: '$images.updatedAt'
              }
            },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' }
          }
        },
        { $sort: { createdAt: 1 } },
        { $limit: limit ? +limit : 30 },
        { $skip: +skip }
      ]);

      return res
        .status(httpStatus.OK)
        .json(sendResponse(httpStatus.OK, 'success', products));
    } catch (error) {
      next(error);
    }
  }
}
