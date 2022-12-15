import { AdminDashboardController } from '../controllers/adminDashboard.controller';
import { AdminDashboardValidator } from '../validators/adminDashboard.validator';
import { authorize } from '../middlewares/auth';
import express from 'express';
import { validate } from '../middlewares/validate';

const router = express.Router();

const routePrefix = '/adminDashboard/';
router
	.route(`${routePrefix}user/getAll`)
	.post(
		authorize([3]),
		validate(AdminDashboardValidator.getAllUsers),
		AdminDashboardController.getAllUsers
	);

router
	.route(`${routePrefix}user/create`)
	.post(
		validate(AdminDashboardValidator.createUser),
		authorize([3]),
		AdminDashboardController.createUser
	);

router
	.route(`${routePrefix}user/delete`)
	.post(
		validate(AdminDashboardValidator.deleteUser),
		authorize([3]),
		AdminDashboardController.deleteUser
	);

router
	.route(`${routePrefix}user/update`)
	.post(
		validate(AdminDashboardValidator.updateUser),
		authorize([3]),
		AdminDashboardController.updateUser
	);

router
	.route(`${routePrefix}class/getAll`)
	.post(
		validate(AdminDashboardValidator.getAllClasses),
		authorize([3]),
		AdminDashboardController.getAllClasses
	);
router
	.route(`${routePrefix}class/create`)
	.post(
		validate(AdminDashboardValidator.createClass),
		authorize([3]),
		AdminDashboardController.createClass
	);
router
	.route(`${routePrefix}class/delete`)
	.post(
		validate(AdminDashboardValidator.deleteClass),
		authorize([3]),
		AdminDashboardController.deleteClass
	);
router
	.route(`${routePrefix}class/update`)
	.post(
		validate(AdminDashboardValidator.updateClass),
		authorize([3]),
		AdminDashboardController.updateClass
	);

router
	.route(`${routePrefix}class/comments`)
	.post(
		authorize([3]),
		validate(AdminDashboardValidator.getClassComments),
		AdminDashboardController.getClassComments
	);

router
	.route(`${routePrefix}class/ratings`)
	.post(
		authorize([3]),
		validate(AdminDashboardValidator.getClassRating),
		AdminDashboardController.getClassRatings
	);

export const AdminDashboardRouter = { router };
