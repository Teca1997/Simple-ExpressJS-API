import Joi from 'Joi';

const registration = Joi.object({
	username: Joi.string().alphanum().min(4).max(15).required(),
	password: Joi.string().alphanum().min(8).max(25).required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required()
});

const login = Joi.object({
	username: Joi.string().alphanum().min(4).max(15).required(),
	password: Joi.string().alphanum().min(8).max(25).required()
});

const emailVerification = Joi.object({
	token: Joi.string().required()
});

export const AuthValidator = { registration, login, emailVerification };
