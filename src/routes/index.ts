import { Request, Response, Router } from 'express';

import authRoute from './auth.routes';
import userRoute from './user.route';
import productRoute from './product.route';
import reviewRoute from './review.route';
import imageRoute from './image.route';

const router = Router();

/** GET /health-check - Check service health */
router.get('/health-check', (_req: Request, res: Response) =>
  res.send({ check: 'peaky sneakers server started ok' })
);

/**************************************************************************************** *
 * ************************************************************************************** *
 * ************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** *
 * ************************************************************************************** *
 * ************************************************************************************** */

// mount product routes
router.use('/auth', authRoute);

// mount users routes
router.use('/users', userRoute);

// mount product routes
router.use('/products', productRoute);

// mount review routes
router.use('/reviews', reviewRoute);

// mount review routes
router.use('/images', imageRoute);

export default router;
