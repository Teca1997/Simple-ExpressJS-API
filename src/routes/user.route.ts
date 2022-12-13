import { UserController } from "../controllers/user.controller";
import { UsersValidator } from "../validators/user.validator";
import { authorize } from "../middlewares/auth";
import express from "express";
import { validate } from "../middlewares/validate";

const router = express.Router();

//post
router
  .route("/users")
  .post(
    authorize([3]),
    validate(UsersValidator.getAllUsers),
    UserController.getAllUsers
  );

export const UserRouter = { router };
