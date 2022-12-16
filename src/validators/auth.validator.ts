import joi from 'joi';

const registration = joi.object({
	username: joi.string().alphanum().min(4).max(15).required(),
	password: joi.string().alphanum().min(8).max(25).required(),
	email: joi.string().email({ minDomainSegments: 2 }).required()
});

const login = joi.object({
	username: joi.string().alphanum().min(4).max(15).required(),
	password: joi.string().alphanum().min(8).max(25).required()
});

const emailVerification = joi.object({
	token: joi.string().required()
});

export const AuthValidator = { registration, login, emailVerification };
