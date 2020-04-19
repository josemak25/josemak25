import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { ResponseInterface } from '../helpers/types';
import ImageInterface, {
  ImageType,
  GetProductImageType
} from '../types/images';

import queries from '../queries';
const { ImageQuery } = queries;

export default class imageController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const images = await ImageQuery.insertMany<ImageType, ImageInterface>(
        req.uploadedImageFiles
      );

      return res
        .status(httpStatus.CREATED)
        .json(sendResponse(httpStatus.CREATED, 'success', images));
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
      const { referenceId } = req.params;

      const images = await ImageQuery.findAll<
        GetProductImageType,
        ImageInterface
      >({ referenceId });

      return res
        .status(httpStatus.OK)
        .json(sendResponse(httpStatus.OK, 'success', images));
    } catch (error) {
      next(error);
    }
  }
}
