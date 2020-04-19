import { Request, Response, NextFunction } from 'express';
import driveService from '../services/drive.service';
import { DriveEnums } from '../types/drive';
import { ImageType } from '../types/images';

export default async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const drive = new driveService();

    const multipleFormImages = req.compressedImages;

    const productDriveImages = multipleFormImages.map(image => {
      return drive.createFile({
        ...image,
        folderId: DriveEnums.IMAGES_PRODUCT_ROOT_ID
      });
    });

    const driveResponse = await Promise.all(productDriveImages);

    const productImages = driveResponse.map(
      ({ data }): ImageType => ({
        url: data.webContentLink,
        thumbnailUrl: data.thumbnailLink,
        referenceId: req.body.referenceId,
        createdAt: data.createdTime,
        updatedAt: data.modifiedTime
      })
    );

    req.uploadedImageFiles = productImages;

    return next();
  } catch (error) {
    next(error);
  }
};
