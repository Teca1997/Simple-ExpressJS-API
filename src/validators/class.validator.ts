import Joi from 'Joi';

const getfilteredClases = Joi.object({
	sports: Joi.array().items(Joi.string()),
	age: Joi.string()
});

const enrollUserIntoClass = Joi.object({
	token: Joi.string().required(),
	classId: Joi.number().required().integer()
});

const unrollUserIntoClass = enrollUserIntoClass;

const commentSportClass = Joi.object({
	token: Joi.string().required(),
	classId: Joi.number().required().integer(),
	comment: Joi.string().required()
});

const rateSportClass = Joi.object({
	token: Joi.string().required(),
	classId: Joi.number().integer().required(),
	rating: Joi.number().integer().min(0).max(5).required()
});

export const ClassesValidator = {
	getfilteredClases,
	enrollUserIntoClass,
	unrollUserIntoClass,
	commentSportClass,
	rateSportClass
};
