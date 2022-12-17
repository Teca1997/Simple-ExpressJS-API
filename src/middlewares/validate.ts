import { NextFunction, Request, Response } from 'express';

import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

export const validate =
	(schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
		const validationResponse = schema.validate(req.body);
		if (validationResponse.error) {
			return next(
				res
					.status(StatusCodes.BAD_REQUEST)
					.send({ errors: validationResponse.error.message })
			);
		}
		return next();
	};
