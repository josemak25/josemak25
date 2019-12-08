import { Request, Response as Res, NextFunction } from "express";
import httpStatus from "http-status";
import Response from "../helpers/response";

import queries from "../queries";
import ResponseInterface from "../types/response.type";

const UserQuery = queries.UserQuery;

export default class userController {
  static async createUser(
    req: Request,
    res: Res,
    next: NextFunction
  ): Promise<ResponseInterface | void> {
    try {
      const { name } = req.body;
      const userExits = await UserQuery.getOne({ name });

      if (userExits) {
        return res.json(
          Response(httpStatus.BAD_REQUEST, "name already exists")
        );
      }
      const user = await UserQuery.create({ ...req.body });

      return res.json(Response(httpStatus.CREATED, "success", user));
    } catch (error) {
      next(error);
    }
  }
}
