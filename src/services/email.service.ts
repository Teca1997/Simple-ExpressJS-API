import nodemailer, { Transporter } from 'nodemailer';

import dotenv from 'dotenv';
import { getEnv } from '../util/getEnv';

dotenv.config();

const transporter: Transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: getEnv('MAIL_SERVICE_USERNAME'),
		pass: getEnv('MAIL_SERVICE_PASSWORD')
	}
});

const sendEmail = async (to: string, subject: string, text: string) => {
	const msg = {
		from: getEnv('MAIL_SERVICE_USERNAME'),
		to: to,
		subject: subject,
		html: `<a>${text}</a>`
	};
	try {
		await transporter.sendMail(msg);
	} catch (error) {
		console.log('error sending email ' + error);
	}
};

export const EmailService = { sendEmail };
