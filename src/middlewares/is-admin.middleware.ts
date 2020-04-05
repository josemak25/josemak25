import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../helpers/response';
import { Role } from '../types/user';

export default (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.token;

  if (role !== Role.ADMIN) {
    return res.json(
      sendResponse(
        httpStatus.UNAUTHORIZED,
        'You are not Authorized to perform this operation!',
        null,
        { error: 'Invalid credentials' }
      )
    );
  }

  return next();
};
