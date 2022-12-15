import { SportClass } from '../../models/SportClass';

export const SportClassSeed: SportClass[] = [
	{
		sport: 1,
		classType: 1,
		timeOfClass: new Date(new Date().setHours(12, 30, 0)),
		weekScheadule: ['Monday', 'Tuesday'],
		duration: new Date(new Date().setHours(1, 0, 0)),
		description: 'class 1 description'
	},
	{
		sport: 2,
		classType: 2,
		timeOfClass: new Date(new Date().setHours(12, 30, 0)),
		weekScheadule: ['Monday'],
		duration: new Date(new Date().setHours(2, 0, 0)),
		description: 'class 2 description'
	},
	{
		sport: 3,
		classType: 3,
		timeOfClass: new Date(new Date().setHours(12, 30, 0)),
		weekScheadule: ['Monday'],
		duration: new Date(new Date().setHours(1, 30, 0)),
		description: 'class 3 description'
	},
	{
		sport: 4,
		classType: 4,
		timeOfClass: new Date(new Date().setHours(12, 30, 0)),
		weekScheadule: ['Monday'],
		duration: new Date(new Date().setHours(1, 30, 0)),
		description: 'class 4 description'
	}
];
