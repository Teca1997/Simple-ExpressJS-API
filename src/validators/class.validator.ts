import joi from 'joi';

const getfilteredClases = joi.object({
	sports: joi.array().items(joi.string()),
	age: joi.string()
});

const enrollUserIntoClass = joi.object({
	classId: joi.number().required().integer()
});

const unrollUserIntoClass = enrollUserIntoClass;

const commentSportClass = joi.object({
	classId: joi.number().required().integer(),
	comment: joi.string().required()
});

const rateSportClass = joi.object({
	classId: joi.number().integer().required(),
	rating: joi.number().integer().min(0).max(5).required()
});

export const ClassValidator = {
	getfilteredClases,
	enrollUserIntoClass,
	unrollUserIntoClass,
	commentSportClass,
	rateSportClass
};
