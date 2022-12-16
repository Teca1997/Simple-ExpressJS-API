import { NextFunction, Request, Response } from 'express';

import { ClassService } from '../services/class.service';
import { sportClassRepo } from '../db';

const getfilteredClases = async (req: Request, res: Response, next: NextFunction) => {
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
		.leftJoin('sc.classType', 'class_type');

	if (req.body.sports) {
		const sports = req.body.sports.split(',');
		query.orWhere('sport.name IN (:...sports)', {
			sports: sports
		});
	}

	if (req.body.age) {
		const ageGroups = req.body.age.split(',');
		query.orWhere('class_type.name IN (:...ageGroups)', {
			ageGroups: ageGroups
		});
	}
	const filteredClasses = await query.execute();
	return res.status(200).send({ classes: filteredClasses });
};

const getClass = async (req: Request, res: Response, next: NextFunction) => {
	const query = sportClassRepo
		.createQueryBuilder('sc')
		.select('sc.id', 'id')
		.addSelect('sc.timeOfClass', 'timeOfClass')
		.addSelect('sc.weekScheadule', 'weekScheadule')
		.addSelect('sc.duration', 'duration')
		.addSelect('sc.description', 'description')
		.addSelect('class_type.name', 'classAgeGroup')
		.addSelect('sport.name', 'sportName')
		.where({ id: parseInt(req.params.classId) })
		.leftJoin('sc.sport', 'sport')
		.leftJoin('sc.classType', 'class_type');

	const filteredClasses = await query.execute();
	return res.status(200).send({ classes: filteredClasses });
};

const enrollUserIntoClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId } = req.body;
	try {
		await ClassService.enrollUserIntoClass(userId, classId);
		res.status(200).send({ messages: [`User ${userId} enrolled in class ${classId}`] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const unrollUserIntoClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId } = req.body;
	try {
		await ClassService.unrollUserIntoClass(userId, classId);
		res.status(200).send({ messages: [`User ${userId} unrolled from class ${classId}`] });
	} catch (error) {
		res.status(400).send({ errors: [error.message] });
	}
};

const rateSportClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId, rating } = req.body;
	try {
		await ClassService.rateClass(userId, classId, rating);
		res.status(200).send({ messages: [`Class ${classId} rated with ˘${rating}`] });
	} catch (error) {
		res.status(200).send({ errors: [error.message] });
	}
};

const commentSportClass = async (req: Request, res: Response) => {
	const userId = res.locals.userId;
	const { classId, comment } = req.body;
	try {
		await ClassService.commentClass(userId, classId, comment);
		res.status(200).send({ messages: [`Class ${classId} commented with ˘${comment}`] });
	} catch (error) {
		res.status(200).send({ errors: [error.message] });
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
