import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import reviewValidation from '../validations/review.validation';
import authToken from '../policies/auth.policy';
import reviewCtrl from '../controllers/review.controller';

const router = Router();

router
  .route('/:productId')
  .get(
    [
      validate(reviewValidation.getProductReview, { abortEarly: false }),
      authToken
    ],
    reviewCtrl.getAll
  );

router
  .route('/')
  .post(
    [validate(reviewValidation.createReview, { abortEarly: false }), authToken],
    reviewCtrl.create
  );

export default router;
