import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/user.service';
import { getEnv } from '../util/getEnv';
import jwt from 'jsonwebtoken';

export const authorize =
	(roles: number[]) => async (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers;
		if (authorization!.startsWith('Bearer ')) {
			const token = authorization!.substring(7, authorization!.length);
			try {
				const payload: any = jwt.verify(token, getEnv('TOKEN_KEY'));
				try {
					const user = await UserService.getUserById(payload.userId);
					const role: any = user!.role!;
					if (roles.includes(role.id, 0)) {
						res.locals.userId = user.id;
						next();
					} else {
						next(
							res
								.status(StatusCodes.UNAUTHORIZED)
								.send({ errors: ['User does have authorization to do that!'] })
						);
					}
				} catch (error) {
					res.status(StatusCodes.NOT_FOUND).send({ errors: [error.message] });
				}
			} catch (error) {
				next(res.status(StatusCodes.BAD_REQUEST).send({ errors: ['Bad token!!!'] }));
			}
		} else {
			next(res.status(StatusCodes.BAD_REQUEST).send({ errors: ['Bad token!!!'] }));
		}
	};
