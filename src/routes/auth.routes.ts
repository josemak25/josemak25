import { Router } from 'express';
import { celebrate as validate } from 'celebrate';
import userValidation from '../validations/user.validation';
import authCtrl from '../controllers/auth.controller';

const router = Router();

router
  .route('/signup')
  .post(
    validate(userValidation.signupUser, { abortEarly: false }),
    authCtrl.register
  );

router
  .route('/login')
  .post(
    validate(userValidation.loginUser, { abortEarly: false }),
    authCtrl.login
  );

export default router;
