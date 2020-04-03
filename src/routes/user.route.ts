import { Router } from 'express';
import authToken from '../policies/auth.policy';
import userCtrl from '../controllers/user.controller';
import IsAdmin from '../middlewares/is-admin.middleware';

const router = Router();

router.route('/').get(authToken, IsAdmin, userCtrl.getAll);

router.route('/:id').get(authToken, userCtrl.getUser);

export default router;
