import { Request, Response } from 'express';
import { sportClassRepo, userRepo } from '../db';

import { ClassService } from '../services/class.service';
import { UserService } from '../services/user.service';

const getAllUsers = async (req: Request, res: Response) => {
	const users = await userRepo.find();
	res.status(200).send(users);
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { username, password, email, role } = req.body;
		const newUser = await UserService.addUser(username, password, email, role);
		res.status(200).send({ user: newUser, messages: ['User created succesfully'] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const { userId, username, email, password, roleId } = req.body;
		const updatedUser = await UserService.updateUser(userId, username, email, password, roleId);
		res.status(200).send({ user: updatedUser, messages: ['User updated succesfully'] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.body;
		await UserService.deleteUser(userId);
		res.status(400).send({ messages: ['User deleted succesfully'] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const getAllClasses = async (req: Request, res: Response) => {
	const classes = await sportClassRepo.find();
	res.status(200).send(classes);
};

const createClass = async (req: Request, res: Response) => {
	try {
		const { sport, classType, timeOfClass, weekScheadule, duration, description } = req.body;
		const newClass = await ClassService.addClass(
			sport,
			classType,
			timeOfClass,
			weekScheadule,
			duration,
			description
		);
		res.status(200).send({ cllass: newClass, messages: ['Class created succesfully'] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const updateClass = async (req: Request, res: Response) => {
	try {
		const { classId, sport, classType, timeOfClass, weekScheadule, duration, description } =
			req.body;
		const updatedClass = await ClassService.updateClass(
			classId,
			sport,
			classType,
			timeOfClass,
			weekScheadule,
			duration,
			description
		);
		res.status(200).send({ class: updatedClass, messages: ['Class updated succesfully'] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const deleteClass = async (req: Request, res: Response) => {
	try {
		const { classId } = req.body;
		await ClassService.deleteClass(classId);
		res.status(400).send({ messages: ['Class deleted succesfully'] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const getClassRatings = async (req: Request, res: Response) => {
	res.status(400).send('NOT IMPLEMENTED YET!!!');
};

const getClassComments = async (req: Request, res: Response) => {
	res.status(400).send('NOT IMPLEMENTED YET!!!');
};

export const AdminDashboardController = {
	getAllUsers,
	createUser,
	deleteUser,
	updateUser,
	getAllClasses,
	createClass,
	deleteClass,
	updateClass,
	getClassComments,
	getClassRatings
};
