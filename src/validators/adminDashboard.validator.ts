import joi from "joi";

const sportClassAllowedWeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const getAllUsers = joi.object({
  token: joi.string().required(),
});

const createUser = joi.object({
  token: joi.string().required(),
  username: joi.string().alphanum().min(4).max(15).required(),
  password: joi.string().alphanum().min(8).max(25).required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  role: joi.number().integer().optional(),
});

const deleteUser = joi.object({
  token: joi.string().required(),
  userId: joi.number().integer().required(),
});

const updateUser = joi
  .object({
    token: joi.string().required(),
    userId: joi.number().integer().required(),
    username: joi.string().alphanum().min(4).max(15).optional(),
    password: joi.string().alphanum().min(8).max(25).optional(),
    email: joi.string().email({ minDomainSegments: 2 }).optional(),
    roleId: joi.number().integer().required().optional(),
  })
  .or("username", "password", "email", "roleId");

const getAllClasses = joi.object({
  token: joi.string().required(),
});

const createClass = joi
  .object({
    token: joi.string().required(),
    sport: joi.number().integer().required(),
    classType: joi.number().integer().required(),
    duration: joi
      .string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required(),
    timeOfClass: joi
      .string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required(),
    description: joi.string().required(),
    weekScheadule: joi
      .array()
      .items(joi.string().valid(...sportClassAllowedWeekDays)),
  })
  .required();

const deleteClass = joi.object({
  token: joi.string().required(),
  classId: joi.number().integer().required(),
});

const updateClass = joi.object({
  token: joi.string().required(),
  classId: joi.number().integer().required(),
  sport: joi.number().integer().optional(),
  classType: joi.number().integer().optional(),
  duration: joi
    .string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .optional(),
  timeOfClass: joi
    .string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .optional(),
  description: joi.string().required(),
  weekScheadule: joi
    .array()
    .items(joi.string().valid(...sportClassAllowedWeekDays))
    .required(),
});

const getClassComments = joi.object({
  token: joi.string().required(),
  classId: joi.number().integer().required(),
});

const getClassRating = getClassComments;

export const AdminDashboardValidator = {
  getClassComments,
  getClassRating,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getAllClasses,
  createClass,
  deleteClass,
  updateClass,
};
