import { queryBuilder, userRepo, userSportClassRepo } from '../db';

import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const addUser = async (
	username: string,
	email: string,
	password: string,
	role = 1
): Promise<User> => {
	try {
		password = await bcrypt.hash(password, 12);
	} catch (error) {
		console.log('Error hashing password: ' + error);
		throw new Error('Server error occured.');
	}
	if (await User.isEmailTaken(email)) {
		throw new Error('Email already taken!');
	}
	if (await User.isUsernameTaken(username)) {
		throw new Error('Username already taken!');
	}
	const insertResult = await queryBuilder
		.insert()
		.into(User)
		.values({ username, password, email, role })
		.returning('*')
		.execute();
	if (insertResult.raw[0] === undefined) {
		throw new Error('Error inserting new user!');
	}
	return insertResult.raw[0];
};

const updateUser = async (
	userId: number,
	username: string | undefined,
	email: string | undefined,
	password: string | undefined,
	roleId: number | undefined
): Promise<User> => {
	if (password) {
		try {
			password = await bcrypt.hash(password, 12);
		} catch (error) {
			console.log('Error hashing password: ' + error);
			throw new Error('Server error occured.');
		}
	}
	await userRepo.update({ id: userId }, { username, password, email, role: roleId });
	const user = await getUserById(userId);
	return user;
};

const getUserById = async (userId: number): Promise<User> => {
	const user: any = await userRepo.findOneBy({ id: userId });
	console.log(user);
	if (user == null) {
		throw new Error('No user found');
	}
	return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
	const user: any = await userRepo.findOneBy({ username: username });
	if (user == null) {
		throw new Error('No user found');
	}
	return user;
};

const getUserByEmail = async (email: string): Promise<User> => {
	const user: any = await userRepo.findOneBy({ email: email });
	if (user == null) {
		throw new Error('No user found');
	}
	return user;
};

const deleteUser = async (userId: number) => {
	await getUserById(userId);
	await userRepo.softDelete({ id: userId });
};

const isUserEnrolledInClass = async (userId: number, classId: number): Promise<boolean> => {
	if (
		await userSportClassRepo.countBy({
			user: userId,
			sportClass: classId
		})
	) {
		return true;
	}
	return false;
};

const isUserClassLimitReached = async (userId: number): Promise<boolean> => {
	if ((await userSportClassRepo.countBy({ user: userId })) < 2) {
		return true;
	}
	return false;
};

export const UserService = {
	addUser,
	getUserById,
	isUserClassLimitReached,
	isUserEnrolledInClass,
	updateUser,
	deleteUser,
	getUserByUsername,
	getUserByEmail
};
