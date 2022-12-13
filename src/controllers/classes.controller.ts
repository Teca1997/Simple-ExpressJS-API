import { NextFunction, Request, Response } from "express";

import { ClassService } from "../services/class.service";
import { sportClassRepo } from "../db";

const getfilteredClases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = sportClassRepo
    .createQueryBuilder("sc")
    .select("sc.id", "id")
    .addSelect("sc.timeOfClass", "timeOfClass")
    .addSelect("sc.weekScheadule", "weekScheadule")
    .addSelect("sc.duration", "duration")
    .addSelect("sc.description", "description")
    .addSelect("class_type.name", "classAgeGroup")
    .addSelect("sport.name", "sportName")
    .leftJoin("sc.sport", "sport")
    .leftJoin("sc.classType", "class_type");

  if (req.body.sports) {
    query.orWhere("sport.name IN (:...sports)", { sports: req.body.sports });
  }

  if (req.body.age) {
    query.orWhere("class_type.name LIKE :name", { name: req.body.age });
  }
  return res.status(200).send(await query.execute());
};

const getClass = async (req: Request, res: Response, next: NextFunction) => {
  const query = sportClassRepo
    .createQueryBuilder("sc")
    .select("sc.id", "id")
    .addSelect("sc.timeOfClass", "timeOfClass")
    .addSelect("sc.weekScheadule", "weekScheadule")
    .addSelect("sc.duration", "duration")
    .addSelect("sc.description", "description")
    .addSelect("class_type.name", "classAgeGroup")
    .addSelect("sport.name", "sportName")
    .where({ id: parseInt(req.params.classId) })
    .leftJoin("sc.sport", "sport")
    .leftJoin("sc.classType", "class_type");

  return res.status(200).send(await query.execute());
};

const enrollUserIntoClass = async (req: Request, res: Response) => {
  const { userId, classId } = res.locals;
  try {
    await ClassService.enrollUserIntoClass(userId, classId);
    res.status(200).send("Enrolled!");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const unrollUserIntoClass = async (req: Request, res: Response) => {
  const { userId, classId } = res.locals;
  try {
    await ClassService.unrollUserIntoClass(userId, classId);
    res.status(200).send("Unrolled!");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const classesControlller = {
  getfilteredClases,
  getClass,
  enrollUserIntoClass,
  unrollUserIntoClass,
};
