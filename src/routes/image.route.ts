import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import imageValidation from '../validations/images.validation';
import authToken from '../policies/auth.policy';
import imageCtrl from '../controllers/images.controller';
import uploadImage from '../middlewares/upload_image.middleware';
import compressImage from '../middlewares/compress_image.middleware';

import IsAdmin from '../middlewares/is_admin.middleware';

const router = Router();

router
  .route('/:referenceId')
  .get(
    [
      validate(imageValidation.getProductImages, { abortEarly: false }),
      authToken
    ],
    imageCtrl.getAll
  );

router
  .route('/')
  .post(
    [
      validate(imageValidation.createImage, { abortEarly: false }),
      authToken,
      IsAdmin,
      compressImage,
      uploadImage
    ],
    imageCtrl.create
  );

export default router;
