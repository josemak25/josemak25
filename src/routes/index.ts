import { Request, Response, Router } from 'express';

import userRoute from './user.route';
import productRoute from './product.route';
import authRoute from './auth.routes';

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

export default router;
