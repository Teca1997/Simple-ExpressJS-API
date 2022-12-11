import express, { NextFunction, Request, Response } from "express";

import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", (res: Request, req: Response, next: NextFunction) =>
  AuthController.register(res, req)
);

router.post("/verifyemail", (res: Request, req: Response) => {
  AuthController.verifyEmail(res, req);
});

export const AuthRouter = { router };
