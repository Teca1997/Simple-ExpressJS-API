import joi from "joi";

const filterClases = joi.object({
  sports: joi.array().items(joi.string()),
  age: joi.string(),
});

const enrollClass = joi.object({
  token: joi.string().required(),
  classId: joi.number().required().integer(),
});

export const ClassesValidator = { filterClases, enrollClass };
