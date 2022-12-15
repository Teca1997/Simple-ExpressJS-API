import { AuthTokens, TokenService } from '../services/token.service';
import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthValidator } from '../validators/auth.validator';
import { EmailService } from '../services/email.service';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

const register = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;
	if (await User.isEmailTaken(email)) {
		return res.status(400).send('Email already in use!');
	}

	if (await User.isUsernameTaken(username)) {
		return res.status(400).send('Username already in use!');
	}

	try {
		const user = await UserService.addUser(username, email, password);
		if (user.id === undefined) return;
		let emailVerificationToken = await TokenService.generateEmailVerificationToken(user.id);
		EmailService.sendEmail(req.body.email, 'Email verification', emailVerificationToken);
		return res.status(200).send(
			`All data valid. 
          User saved to database. 
          Verification email sent. 
          Verification token: ${emailVerificationToken}`
		);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const verifyEmail = async (req: Request, res: Response) => {
	const validationResponse = AuthValidator.emailVerification.validate(req.body);
	if (validationResponse.error) {
		return res.status(400).send(validationResponse.error.message);
	}

	try {
		await AuthService.verifyEmail(req.body.token);
	} catch (error) {
		return res.status(400).send(error.message);
	}

	return res.status(400).send('Email verified!');
};

const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user: User = await AuthService.loginWithUserNameAndPassword(username, password);
		if (!user.verifiedDate) return res.status(400).send('User did not confirm their email!');
		const tokens: AuthTokens = await TokenService.generateAuthenticationTokens(user);
		return res.status(200).send({ user, tokens });
	} catch (error) {
		return res.status(400).send(error.message);
	}
};

export const AuthController = { register, login, verifyEmail };
