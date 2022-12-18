import joi from 'joi';

const sportClassAllowedWeekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const createUser = joi.object({
	username: joi.string().alphanum().min(4).max(15).required(),
	password: joi.string().alphanum().min(8).max(25).required(),
	email: joi.string().email({ minDomainSegments: 2 }).required(),
	roleId: joi.number().integer().optional()
});

const deleteUser = joi.object({
	userId: joi.number().integer().required()
});

const updateUser = joi.object({
	userId: joi.number().integer().required(),
	username: joi.string().alphanum().min(4).max(15).required(),
	password: joi.string().alphanum().min(8).max(25).required(),
	email: joi.string().email({ minDomainSegments: 2 }).required(),
	roleId: joi.number().integer().required().required()
});

const updateUserPartialy = joi
	.object({
		userId: joi.number().integer().required(),
		username: joi.string().alphanum().min(4).max(15).optional(),
		password: joi.string().alphanum().min(8).max(25).optional(),
		email: joi.string().email({ minDomainSegments: 2 }).optional(),
		roleId: joi.number().integer().required().optional()
	})
	.or('username', 'password', 'email', 'roleId');

const createClass = joi
	.object({
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
		weekScheadule: joi.array().items(joi.string().valid(...sportClassAllowedWeekDays))
	})
	.required();

const deleteClass = joi.object({
	classId: joi.number().integer().required()
});

const updateClass = joi.object({
	classId: joi.number().integer().required(),
	sport: joi.number().integer().required(),
	classType: joi.number().integer().required(),
	duration: joi
		.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.message('Duration must be of format hh:mm')
		.required(),
	timeOfClass: joi
		.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.message('Time of class must be of format hh:mm')
		.required(),
	description: joi.string().required(),
	weekScheadule: joi
		.array()
		.items(joi.string().valid(...sportClassAllowedWeekDays))
		.required()
});

const updateClassPartialy = joi
	.object({
		classId: joi.number().integer().required(),
		sport: joi.number().integer().optional(),
		classType: joi.number().integer().optional(),
		duration: joi
			.string()
			.regex(/^([0-9]{2})\:([0-9]{2})$/)
			.message('Duration must be of format hh:mm')
			.optional(),
		timeOfClass: joi
			.string()
			.regex(/^([0-9]{2})\:([0-9]{2})$/)
			.message('Time of class must be of format hh:mm')
			.optional(),
		description: joi.string().optional(),
		weekScheadule: joi
			.array()
			.items(joi.string().valid(...sportClassAllowedWeekDays))
			.optional()
	})
	.or('sport', 'classType', 'duration', 'timeOfClass', 'description', 'weekScheadule');

const getClassComments = joi.object({
	classId: joi.number().integer().required()
});

const getClassRating = getClassComments;

export const AdminValidator = {
	getClassComments,
	getClassRating,
	createUser,
	deleteUser,
	updateUser,
	updateUserPartialy,
	createClass,
	deleteClass,
	updateClass,
	updateClassPartialy
};
