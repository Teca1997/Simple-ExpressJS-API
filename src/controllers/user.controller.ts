import { Request, Response } from "express";

import { userRepo } from "../db";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepo.find();
  res.status(200).send(users);
};

export const UserController = { getAllUsers };
