import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwtService from '../services/auth.service';
import sendResponse from '../helpers/response';

export default async (req: Request, res: Response, next: NextFunction) => {
  let tokenToVerify: string | null = null;
  const signature = req.header('Authorization');
  const content = signature ? signature.split(' ') : false;

  if (content && content.length === 2 && content[0] === 'Bearer') {
    tokenToVerify = content[1];
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.body.token;
  }

  if (tokenToVerify) {
    try {
      const token = await jwtService.verify(tokenToVerify);
      req.token = token;
      return next();
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).json(
        sendResponse(httpStatus.UNAUTHORIZED, 'Invalid Token', null, {
          error: 'Invalid Token'
        })
      );
    }
  }

  return res.status(httpStatus.UNAUTHORIZED).json(
    sendResponse(httpStatus.UNAUTHORIZED, 'No Token found', null, {
      error: 'No Authorization found'
    })
  );
};
