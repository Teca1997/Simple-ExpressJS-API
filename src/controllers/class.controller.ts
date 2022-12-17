import { NextFunction, Request, Response } from 'express';

import { ClassService } from '../services/class.service';
import { StatusCodes } from 'http-status-codes';
import { sportClassRepo } from '../db';

const getfilteredClases = async (req: Request, res: Response, next: NextFunction) => {
	console.log('Get filtered classes');

	console.log(req.query);
	let sports: string[] = [''];
	let ageGroups: string[] = [''];
	if (req.query.sports != undefined) {
		if (typeof req.query.sports == 'string') {
			sports = req.query.sports.split(',');
		} else {
			return res.send(StatusCodes.BAD_REQUEST).send({
				errors: ['Bad value passed for sports parameter']
			});
		}
	}
	if (req.query.age != undefined) {
		if (typeof req.query.age == 'string') {
			ageGroups = req.query.age.split(',');
		} else {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.send({ errors: ['Bad value passed for age parameter'] });
		}
	}
	const query = sportClassRepo
		.createQueryBuilder('sc')
		.select('sc.id', 'id')
		.addSelect('sc.timeOfClass', 'timeOfClass')
		.addSelect('sc.weekScheadule', 'weekScheadule')
		.addSelect('sc.duration', 'duration')
		.addSelect('sc.description', 'description')
		.addSelect('class_type.name', 'classAgeGroup')
		.addSelect('sport.name', 'sportName')
		.leftJoin('sc.sport', 'sport')
		.leftJoin('sc.classType', 'class_type')
		.orWhere('sport.name IN (:...sports)', {
			sports: sports
		})
		.orWhere('class_type.name IN (:...ageGroups)', {
			ageGroups: ageGroups
		});
	const filteredClasses = await query.execute();
	if (!filteredClasses.length) {
		return res.status(StatusCodes.NOT_FOUND).send({ errors: ['No classes found'] });
	}
	return res.status(StatusCodes.OK).send({ classes: filteredClasses });
};

const getClass = async (req: Request, res: Response, next: NextFunction) => {
	const classId = parseInt(req.params.classId);
	if (!classId) {
		return res.status(StatusCodes.BAD_REQUEST).send({ errors: ['classId must be integer'] });
	}
	const query = sportClassRepo
		.createQueryBuilder('sc')
		.select('sc.id', 'id')
		.addSelect('sc.timeOfClass', 'timeOfClass')
		.addSelect('sc.weekScheadule', 'weekScheadule')
		.addSelect('sc.duration', 'duration')
		.addSelect('sc.description', 'description')
		.addSelect('class_type.name', 'classAgeGroup')
		.addSelect('sport.name', 'sportName')
		.where({ id: classId })
		.leftJoin('sc.sport', 'sport')
		.leftJoin('sc.classType', 'class_type');

	const sportClass = await query.execute();
	if (!sportClass.length) {
		return res.status(StatusCodes.NOT_FOUND).send({ errors: ['No class found'] });
	}

	return res.status(StatusCodes.OK).send({ classes: sportClass });
};

const enrollUserIntoClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId } = req.body;
	try {
		await ClassService.enrollUserIntoClass(userId, classId);
		res.status(StatusCodes.CREATED).send({
			messages: [`User ${userId} enrolled in class ${classId}`]
		});
	} catch (error) {
		res.status(StatusCodes.NOT_FOUND).send({ errors: [error.message] });
	}
};

const unrollUserIntoClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId } = req.body;
	try {
		await ClassService.unrollUserIntoClass(userId, classId);
		res.status(StatusCodes.OK).send({
			messages: [`User ${userId} unrolled from class ${classId}`]
		});
	} catch (error) {
		res.status(StatusCodes.NOT_FOUND).send({ errors: [error.message] });
	}
};

const rateSportClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId, rating } = req.body;
	try {
		await ClassService.rateClass(userId, classId, rating);
		res.status(StatusCodes.OK).send({ messages: [`Class ${classId} rated with ˘${rating}`] });
	} catch (error) {
		res.status(StatusCodes.NOT_FOUND).send({ errors: [error.message] });
	}
};

const commentSportClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId, comment } = req.body;
	try {
		await ClassService.commentClass(userId, classId, comment);
		res.status(StatusCodes.OK).send({
			messages: [`Class ${classId} commented with ˘${comment}`]
		});
	} catch (error) {
		res.status(StatusCodes.NOT_FOUND).send({ errors: [error.message] });
	}
};

export const classesControlller = {
	getfilteredClases,
	getClass,
	enrollUserIntoClass,
	unrollUserIntoClass,
	rateSportClass,
	commentSportClass
};
