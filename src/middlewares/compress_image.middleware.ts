import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import { Request, Response, NextFunction } from 'express';
import { FormImageType, ImageUploadType } from '../types/images';
import { unCompressedImageDir, compressedImageDir } from '../config';

export default async (req: Request, _res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const multipleFormImages: FormImageType[] = req.files.images;

    const files = await imagemin([`${unCompressedImageDir}/*.{jpg,png}`], {
      destination: compressedImageDir,
      plugins: [
        imageminMozjpeg({ quality: 50, progressive: true }),
        imageminPngquant({ quality: [0.5, 0.6] })
      ]
    });

    const compressedImages = await Promise.all(files);

    const imagesToUpload = compressedImages.map(
      ({ destinationPath, sourcePath }): ImageUploadType => {
        const imageMetaData = multipleFormImages.find(
          ({ path }) => path === sourcePath
        );

        return {
          name: `${req.body.referenceId}.${imageMetaData?.type.split('/')[1]}`,
          type: `${imageMetaData?.type}`,
          path: destinationPath,
          folderId: ''
        };
      }
    );

    req.compressedImages = imagesToUpload;

    return next();
  } catch (error) {
    next(error);
  }
};
