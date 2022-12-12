import { NextFunction, Request, Response } from "express";

import { sportClassRepo } from "../db";

const getfilteredClases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const queryResult = await sportClassRepo
    .createQueryBuilder("sport_class")
    .addSelect("sport.name", "sport_name")
    .addSelect("class_type.name", "class_age_group")
    .leftJoin("sport_class.sport", "sport")
    .leftJoin("sport_class.classType", "class_type")
    .where("sport.name IN (:...sports)", { sports: req.body.sports })
    .orWhere("class_type.name LIKE :name", { name: req.body.age })
    .execute();
  return res.status(200).send(queryResult);
};

export const APIControlller = { getfilteredClases };
