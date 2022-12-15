import { tokenRepo, userRepo } from '../db';

import { TokenService } from './token.service';
import { User } from '../models/User';
import moment from 'moment';

const loginWithUserNameAndPassword = async (username: string, password: string): Promise<User> => {
	const user = await userRepo.findOne({ where: { username } });
	if (!user || !(await user.doesPasswordMatch!(password))) {
		throw new Error('Incorrect username or password!');
	}
	return user;
};

const verifyEmail = async (token: string): Promise<User> => {
	const verifyEmailTokenData = await TokenService.verifyEmailToken(token);
	const user = await userRepo.findOne({
		where: { id: verifyEmailTokenData.userId }
	});
	if (!user) {
		throw new Error('User not found');
	}
	user.verifiedDate = moment();
	user.role = 2;
	await tokenRepo.delete({ user: user.id });
	console.log(await userRepo.save(user));
	return user;
};

export const AuthService = { verifyEmail, loginWithUserNameAndPassword };
