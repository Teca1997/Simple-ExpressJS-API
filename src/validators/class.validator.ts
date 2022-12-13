import joi from "joi";

const getfilteredClases = joi.object({
  sports: joi.array().items(joi.string()),
  age: joi.string(),
});

const enrollUserIntoClass = joi.object({
  token: joi.string().required(),
  classId: joi.number().required().integer(),
});

const unrollUserIntoClass = enrollUserIntoClass;

const commentSportClass = joi.object({
  token: joi.string().required(),
  classId: joi.number().required().integer(),
  comment: joi.string().required(),
});

const rateSportClass = joi.object({
  token: joi.string().required(),
  classId: joi.number().integer().required(),
  rating: joi.number().integer().min(0).max(5).required(),
});

export const ClassesValidator = {
  getfilteredClases,
  enrollUserIntoClass,
  unrollUserIntoClass,
  commentSportClass,
  rateSportClass,
};
