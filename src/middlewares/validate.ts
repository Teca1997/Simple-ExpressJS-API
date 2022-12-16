import { NextFunction, Request, Response } from 'express';

import Joi from 'joi';

export const validate =
	(schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
		const validationResponse = schema.validate(req.body);
		if (validationResponse.error) {
			return next(validationResponse.error.message);
		}
		return next();
	};
