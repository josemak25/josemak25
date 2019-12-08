import { Router } from "express";
import { celebrate as validate } from "celebrate";
import userValidation from "../validations/user.validation";
import userController from "../controller/user.controller";

const router = Router();

router
  .route("/")
  .post(
    validate(userValidation.createUser, { abortEarly: false }),
    userController.createUser
  );

export default router;
