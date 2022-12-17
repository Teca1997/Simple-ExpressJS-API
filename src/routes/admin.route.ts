import { AdminController } from '../controllers/admin.controller';
import { AdminValidator } from '../validators/admin.validator';
import { authorize } from '../middlewares/auth';
import express from 'express';
import { validate } from '../middlewares/validate';

const router = express.Router();

const routePrefix = '/admin/';
router.route(`${routePrefix}user/`).get(authorize([3]), AdminController.getAllUsers);

router
	.route(`${routePrefix}user/create`)
	.post(validate(AdminValidator.createUser), authorize([3]), AdminController.createUser);

router
	.route(`${routePrefix}user/delete`)
	.delete(validate(AdminValidator.deleteUser), authorize([3]), AdminController.deleteUser);

router
	.route(`${routePrefix}user/update`)
	.put(validate(AdminValidator.updateUser), authorize([3]), AdminController.updateUser);

router.route(`${routePrefix}class/`).get(authorize([3]), AdminController.getAllClasses);
router
	.route(`${routePrefix}class/create`)
	.post(validate(AdminValidator.createClass), authorize([3]), AdminController.createClass);
router
	.route(`${routePrefix}class/delete`)
	.delete(validate(AdminValidator.deleteClass), authorize([3]), AdminController.deleteClass);
router
	.route(`${routePrefix}class/update`)
	.put(validate(AdminValidator.updateClass), authorize([3]), AdminController.updateClass);

router
	.route(`${routePrefix}class/comments`)
	.post(
		authorize([3]),
		validate(AdminValidator.getClassComments),
		AdminController.getClassComments
	);

router
	.route(`${routePrefix}class/ratings`)
	.post(authorize([3]), validate(AdminValidator.getClassRating), AdminController.getClassRatings);

export const AdminRouter = { router };
