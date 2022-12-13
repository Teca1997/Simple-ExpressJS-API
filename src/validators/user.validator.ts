import joi from "joi";

const getAllUsers = joi.object({
  token: joi.string().required(),
});

export const UsersValidator = { getAllUsers };
