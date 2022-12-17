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
		.required(),
	timeOfClass: joi
		.string()
		.regex(/^([0-9]{2})\:([0-9]{2})$/)
		.required(),
	description: joi.string().required(),
	weekScheadule: joi
		.array()
		.items(joi.string().valid(...sportClassAllowedWeekDays))
		.required()
});

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
	createClass,
	deleteClass,
	updateClass
};
