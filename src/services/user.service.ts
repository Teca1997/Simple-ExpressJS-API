import { queryBuilder, userRepo, userSportClassRepo } from "../db";

import { User } from "../models/User";
import bcrypt from "bcryptjs";

const addUser = async (
  username: string,
  password: string,
  email: string
): Promise<number | undefined> => {
  try {
    password = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log("Error hashing password: " + error);
  }

  try {
    const insertResult = await queryBuilder
      .insert()
      .into(User)
      .values({ username, password, email })
      .returning("id")
      .execute();
    return insertResult.raw[0].id;
  } catch (error) {
    console.log("Error inserting new user: " + error);
  }
  return;
};

const getUserById = async (userId: number): Promise<User> => {
  const user: any = userRepo.findOneBy({ id: userId });
  if (!user) {
    throw new Error("No user found");
  } else {
    return user;
  }
};

const isUserEnrolledInClass = async (
  userId: number,
  classId: number
): Promise<boolean> => {
  if (
    await userSportClassRepo.countBy({
      user: userId,
      sportClass: classId,
    })
  ) {
    return true;
  }
  return false;
};

const isUserClassLimitReached = async (userId: number): Promise<boolean> => {
  if ((await userSportClassRepo.countBy({ user: userId })) < 2) {
    return true;
  }
  return false;
};

export const UserService = {
  addUser,
  getUserById,
  isUserClassLimitReached,
  isUserEnrolledInClass,
};
