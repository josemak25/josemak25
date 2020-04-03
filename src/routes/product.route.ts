import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import productValidation from '../validations/product.validation';
import authToken from '../policies/auth.policy';
import productCtrl from '../controllers/product.controller';
import IsAdmin from '../middlewares/is-admin.middleware';

const router = Router();

router
  .route('/')
  .get(authToken, productCtrl.getAll)
  .post(
    [
      validate(productValidation.createProduct, { abortEarly: false }),
      authToken,
      IsAdmin
    ],
    productCtrl.create
  );

export default router;
