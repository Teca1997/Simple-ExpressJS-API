import { commentRepo, ratingRepo, sportClassRepo, userSportClassRepo } from '../db';

import { Moment } from 'moment';
import { Rating } from '../models/Rating';
import { SportClass } from '../models/SportClass';
import { UserService } from './user.service';

const addClass = async (
	sport: number,
	classType: number,
	timeOfClass: Moment,
	weekScheadule: string[],
	duration: Moment,
	description: string
): Promise<SportClass> => {
	const newClassId = (
		await sportClassRepo.insert({
			sport,
			classType,
			timeOfClass,
			weekScheadule,
			duration,
			description
		})
	).raw[0].id;
	const newClass = await sportClassRepo.findOne({ where: { id: newClassId } });
	if (!newClass) {
		throw new Error('NEW CLASS NOT FOUND!!!');
	}

	return newClass;
};

const updateClass = async (
	id: number,
	sport: number,
	classType: number,
	timeOfClass: Moment,
	weekScheadule: string[],
	duration: Moment,
	description: string
): Promise<SportClass> => {
	await sportClassRepo.update(
		{ id },
		{ sport, classType, timeOfClass, weekScheadule, duration, description }
	);
	const updatedClass = await sportClassRepo.findBy({ id });
	if (updatedClass === null) {
		throw new Error('Updated class could not be found!');
	}
	return updatedClass[0];
};

const deleteClass = async (classId: number) => {
	await getClassById(classId);
	await sportClassRepo.softDelete({ id: classId });
};

const enrollUserIntoClass = async (userId: number, classId: number) => {
	const sportClass = await sportClassRepo.findBy({ id: userId });
	if (!sportClass) {
		throw new Error(`Class ${classId} does not exist!`);
	}
	if (!(await canClassBeEnrolledIn(classId))) {
		throw new Error(`Maximum number of user's already enrolled in class ${classId}!`);
	}
	if (!(await UserService.isUserClassLimitReached(userId))) {
		throw new Error(`User ${userId} already enrolled in a mamimum number of classes!`);
	}
	if (await UserService.isUserEnrolledInClass(userId, classId)) {
		throw new Error(`User ${userId} already enrolled in class ${classId}`);
	}
	return await userSportClassRepo.insert({
		user: userId,
		sportClass: classId
	});
};

const unrollUserIntoClass = async (userId: number, classId: number) => {
	const sportClass = await sportClassRepo.findBy({ id: userId });
	if (!sportClass) {
		throw new Error('Class does not exist!');
	}
	if (!(await UserService.isUserEnrolledInClass(userId, classId))) {
		throw new Error(`User ${userId} is not enrolled in class ${classId}`);
	}
	return await userSportClassRepo.delete({ user: userId, sportClass: classId });
};

const getClassById = async (classId: number): Promise<SportClass> => {
	const sportClass: any = sportClassRepo.findOneBy({ id: classId });
	if (sportClass === undefined) {
		throw new Error('No sport class found');
	} else {
		return sportClass;
	}
};

const canClassBeEnrolledIn = async (classId: number): Promise<boolean> => {
	const classUserCount = await userSportClassRepo.countBy({
		sportClass: classId
	});
	if (classUserCount < 10) {
		return true;
	}
	return false;
};

const hasUserLeftACommentOnClass = async (userId: number, classId: number): Promise<boolean> => {
	if (await commentRepo.countBy({ user: userId, sportClass: classId })) {
		return true;
	}
	return false;
};

const hasUserLeftARatingOnClass = async (userId: number, classId: number): Promise<boolean> => {
	if (await ratingRepo.countBy({ user: userId, sportClass: classId })) {
		return true;
	}
	return false;
};

const commentClass = async (userId: number, classId: number, comment: string) => {
	if (await hasUserLeftACommentOnClass(userId, classId)) {
		throw new Error('User already left a comment on this class');
	}
	if (await UserService.isUserEnrolledInClass(userId, classId)) {
		throw new Error(`User ${userId} is not enrolled in class ${classId}`);
	}
	commentRepo.insert({ user: userId, sportClass: classId, comment: comment });
};

const rateClass = async (userId: number, classId: number, rating: number) => {
	if (await hasUserLeftARatingOnClass(userId, classId)) {
		throw new Error('User already left a rating on this class');
	}
	if (await UserService.isUserEnrolledInClass(userId, classId)) {
		throw new Error(`User ${userId} is not enrolled in class ${classId}`);
	}
	await ratingRepo.insert({
		user: userId,
		sportClass: classId,
		rating: rating
	});
	updateClassAvgerageRating(classId, rating);
};

const updateClassAvgerageRating = async (classId: number, rating: number) => {
	const classRatings = await ratingRepo.find({
		where: { sportClass: classId }
	});
	const ratings = classRatings.map((rating: Rating) => {
		return rating.rating;
	});
	const avgRating: number =
		ratings.reduce((prev: number, curr: number) => {
			return prev + curr;
		}) / ratings.length;
	await sportClassRepo.update({ id: classId }, { averageRating: avgRating });
};

export const ClassService = {
	addClass,
	enrollUserIntoClass,
	unrollUserIntoClass,
	canClassBeEnrolledIn,
	hasUserLeftACommentOnClass,
	hasUserLeftARatingOnClass,
	commentClass,
	rateClass,
	updateClass,
	deleteClass
};
