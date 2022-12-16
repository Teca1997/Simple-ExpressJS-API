import { NextFunction, Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { getEnv } from '../util/getEnv';
import jwt from 'jsonwebtoken';

export const authorize =
	(roles: number[]) => async (req: Request, res: Response, next: NextFunction) => {
		const { token } = req.body;
		try {
			const payload: any = jwt.verify(token, getEnv('TOKEN_KEY'));
			/* console.log('payload');
			console.log(payload); */
			try {
				const user = await UserService.getUserById(payload.userId);
				/* console.log('user!');
				console.log(user.role); */
				const role: any = user!.role!;
				if (roles.includes(role.id, 0)) {
					res.locals.userId = user.id;
					next();
				} else {
					next(
						res
							.status(400)
							.send({ errors: ['User does have authorization to do that!'] })
					);
				}
			} catch (error) {
				res.status(400).send({ errors: [error.message] });
			}
		} catch (error) {
			next(res.status(400).send({ errors: ['Bad token!!!'] }));
		}
	};
