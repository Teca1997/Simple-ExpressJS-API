import moment, { Moment } from 'moment';
import { queryBuilder, tokenRepo } from '../db';

import { Token } from '../models/Token';
import { User } from '../models/User';
import { getEnv } from '../util/getEnv';
import jwt from 'jsonwebtoken';

const generateToken = (userId: number, expiryDate: Moment, type: string): string => {
	return jwt.sign({ userId, expiryDate, type }, getEnv('TOKEN_KEY'));
};

const generateEmailVerificationToken = async (userId: number): Promise<string> => {
	let token = generateToken(userId, moment().add(1, 'days'), 'Email verification token');
	saveToken(token, userId);
	return token;
};

const generateAuthenticationTokens = async (user: User): Promise<AuthTokens> => {
	const accessTokenExpiryDate = moment().add(120, 'minutes');
	const accessToken = generateToken(user.id!, accessTokenExpiryDate, 'Access token');

	const refreshTokenExpiryDate = moment().add(2, 'days');
	const refreshToken = generateToken(user.id!, refreshTokenExpiryDate, 'Refresh token');
	saveToken(refreshToken, user.id!);
	return {
		access: {
			token: accessToken,
			expiryDate: accessTokenExpiryDate
		},
		refresh: {
			token: refreshToken,
			expiryDate: refreshTokenExpiryDate
		}
	};
};

const verifyEmailToken = async (token: string): Promise<EmailVerificationToken> => {
	const payload = jwt.verify(token, getEnv('TOKEN_KEY'));
	const dbToken = await tokenRepo.findOne({ where: { token } });
	if (!dbToken) {
		throw new Error('Token not found');
	}

	return {
		userId: JSON.parse(JSON.stringify(payload)).userId,
		type: JSON.parse(JSON.stringify(payload)).type,
		expiryDate: JSON.parse(JSON.stringify(payload)).expiryDate
	};
};

const saveToken = async (token: string, userId: number) => {
	await queryBuilder.insert().into(Token).values({ user: userId, token }).execute();
};

export interface EmailVerificationToken {
	type: string;
	expiryDate: Date;
	userId: number;
}

export interface AuthTokens {
	access: {
		token: string;
		expiryDate: Moment;
	};
	refresh: {
		token: string;
		expiryDate: Moment;
	};
}

export const TokenService = {
	generateEmailVerificationToken,
	generateAuthenticationTokens,
	generateToken,
	verifyEmailToken,
	saveToken
};
