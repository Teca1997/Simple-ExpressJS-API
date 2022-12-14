import {
  commentRepo,
  ratingRepo,
  sportClassRepo,
  userSportClassRepo,
} from "../db";

import { UserService } from "./user.service";

const enrollUserIntoClass = async (userId: number, classId: number) => {
  const sportClass = await sportClassRepo.findBy({ id: userId });
  if (!sportClass) {
    throw new Error(`Class ${classId} does not exist!`);
  }
  if (!(await canClassBeEnrolledIn(classId))) {
    throw new Error(
      `Maximum number of user's already enrolled in class ${classId}!`
    );
  }
  if (!(await UserService.isUserClassLimitReached(userId))) {
    throw new Error(
      `User ${userId} already enrolled in a mamimum number of classes!`
    );
  }
  if (await UserService.isUserEnrolledInClass(userId, classId)) {
    throw new Error(`User ${userId} already enrolled in class ${classId}`);
  }
  return await userSportClassRepo.insert({
    user: userId,
    sportClass: classId,
  });
};

const unrollUserIntoClass = async (userId: number, classId: number) => {
  const sportClass = await sportClassRepo.findBy({ id: userId });
  if (!sportClass) {
    throw new Error("Class does not exist!");
  }
  if (!(await UserService.isUserEnrolledInClass(userId, classId))) {
    throw new Error(`User ${userId} is not enrolled in class ${classId}`);
  }
  return await userSportClassRepo.delete({ user: userId, sportClass: classId });
};

const canClassBeEnrolledIn = async (classId: number): Promise<boolean> => {
  const classUserCount = await userSportClassRepo.countBy({
    sportClass: classId,
  });
  console.log(classUserCount);
  if (classUserCount < 10) {
    return true;
  }
  return false;
};

const hasUserLeftACommentOnClass = async (
  userId: number,
  classId: number
): Promise<boolean> => {
  if (await commentRepo.countBy({ user: userId, sportClass: classId })) {
    return true;
  }
  return false;
};

const hasUserLeftARatingOnClass = async (
  userId: number,
  classId: number
): Promise<boolean> => {
  if (await ratingRepo.countBy({ user: userId, sportClass: classId })) {
    return true;
  }
  return false;
};

const commentClass = async (
  userId: number,
  classId: number,
  comment: string
) => {
  if (await hasUserLeftACommentOnClass(userId, classId)) {
    throw new Error("User already left a comment on this class");
  }
  if (await UserService.isUserEnrolledInClass(userId, classId)) {
    throw new Error(`User ${userId} is not enrolled in class ${classId}`);
  }
  commentRepo.insert({ user: userId, sportClass: classId, comment: comment });
};

const rateClass = async (userId: number, classId: number, rating: number) => {
  if (await hasUserLeftARatingOnClass(userId, classId)) {
    throw new Error("User already left a rating on this class");
  }
  if (await UserService.isUserEnrolledInClass(userId, classId)) {
    throw new Error(`User ${userId} is not enrolled in class ${classId}`);
  }
  ratingRepo.insert({ user: userId, sportClass: classId, rating: rating });
};

export const ClassService = {
  enrollUserIntoClass,
  unrollUserIntoClass,
  canClassBeEnrolledIn,
  hasUserLeftACommentOnClass,
  hasUserLeftARatingOnClass,
  commentClass,
  rateClass,
};
