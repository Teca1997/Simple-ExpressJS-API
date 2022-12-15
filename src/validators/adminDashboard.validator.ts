import Joi from 'Joi';

const sportClassAllowedWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getAllUsers = Joi.object({
	token: Joi.string().required()
});

const createUser = Joi.object({
	token: Joi.string().required(),
	username: Joi.string().alphanum().min(4).max(15).required(),
	password: Joi.string().alphanum().min(8).max(25).required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	role: Joi.number().integer().optional()
});

const deleteUser = Joi.object({
	token: Joi.string().required(),
	userId: Joi.number().integer().required()
});

const updateUser = Joi.object({
	token: Joi.string().required(),
	userId: Joi.number().integer().required(),
	username: Joi.string().alphanum().min(4).max(15).optional(),
	password: Joi.string().alphanum().min(8).max(25).optional(),
	email: Joi.string().email({ minDomainSegments: 2 }).optional(),
	roleId: Joi.number().integer().required().optional()
}).or('username', 'password', 'email', 'roleId');

const getAllClasses = Joi.object({
	token: Joi.string().required()
});

const createClass = Joi.object({
	token: Joi.string().required(),
	sport: Joi.number().integer().required(),
	classType: Joi.number().integer().required(),
	duration: Joi.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.required(),
	timeOfClass: Joi.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.required(),
	description: Joi.string().required(),
	weekScheadule: Joi.array().items(Joi.string().valid(...sportClassAllowedWeekDays))
}).required();

const deleteClass = Joi.object({
	token: Joi.string().required(),
	classId: Joi.number().integer().required()
});

const updateClass = Joi.object({
	token: Joi.string().required(),
	classId: Joi.number().integer().required(),
	sport: Joi.number().integer().optional(),
	classType: Joi.number().integer().optional(),
	duration: Joi.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.optional(),
	timeOfClass: Joi.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.optional(),
	description: Joi.string().required(),
	weekScheadule: Joi.array()
		.items(Joi.string().valid(...sportClassAllowedWeekDays))
		.required()
});

const getClassComments = Joi.object({
	token: Joi.string().required(),
	classId: Joi.number().integer().required()
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
	updateClass
};
