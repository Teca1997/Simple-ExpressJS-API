import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/user.service";
import { getEnv } from "../util/getEnv";
import jwt from "jsonwebtoken";

export const authorize =
  (roles: number[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, classId } = req.body;
    try {
      const payload: any = jwt.verify(token, getEnv("TOKEN_KEY"));
      console.log(payload);
      try {
        const user = await UserService.getUserById(payload.userId);
        if (roles.includes(user.role!, 0)) {
          res.locals.userId = user.id;
          res.locals.classId = classId;
          next();
        } else {
          next(
            res.status(400).send("User does have authorization to do that!")
          );
        }
      } catch (error) {
        res.status(400).send(error);
      }
    } catch (error) {
      next(res.status(400).send("Bad token!!!"));
    }
  };
