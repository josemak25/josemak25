import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import authValidation from '../validations/auth.validation';
import authCtrl from '../controllers/auth.controller';

const router = Router();

router
  .route('/signup')
  .post(
    [validate(authValidation.signupUser, { abortEarly: false })],
    authCtrl.register
  );

router
  .route('/login')
  .post(
    validate(authValidation.loginUser, { abortEarly: false }),
    authCtrl.login
  );

export default router;
