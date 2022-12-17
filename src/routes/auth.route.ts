import { AuthController } from '../controllers/auth.controller';
import { AuthValidator } from '../validators/auth.validator';
import express from 'express';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.route('/register').post(validate(AuthValidator.registration), AuthController.register);

router
	.route('/verifyemail')
	.patch(validate(AuthValidator.emailVerification), AuthController.verifyEmail);

router.route('/login').post(validate(AuthValidator.login), AuthController.login);

export const AuthRouter = { router };
