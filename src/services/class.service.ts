import { sportClassRepo, userSportClassRepo } from "../db";

import { UserService } from "./user.service";

const enrollUserIntoClass = async (userId: number, classId: number) => {
  const sportClass = await sportClassRepo.findBy({ id: userId });
  if (!sportClass) {
    throw new Error("Class does not exist!");
  }
  if (!(await canClassBeEnrolledIn(classId))) {
    throw Error("Maximum number of user's already enrolled in this class!");
  }
  if (!(await UserService.canUserEnrollIntoClass(userId))) {
    throw Error("User already enrolled in a mamimum number of classes!");
  }
  return await userSportClassRepo.insert({ user: userId, sportClass: classId });
};

const unrollUserIntoClass = async (userId: number, classId: number) => {
  const sportClass = await sportClassRepo.findBy({ id: userId });
  if (!sportClass) {
    throw new Error("Class does not exist!");
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

export const ClassService = {
  enrollUserIntoClass,
  unrollUserIntoClass,
  canClassBeEnrolledIn,
};
