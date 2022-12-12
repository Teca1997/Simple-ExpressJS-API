import joi from "joi";

const filterClases = joi.object({
  sports: joi.array().items(joi.string()),
  age: joi.string(),
});
export const APIValidator = { filterClases };
