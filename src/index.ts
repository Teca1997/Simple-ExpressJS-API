import { AdminRouter } from './routes/admin.route';
import { AuthRouter } from './routes/auth.route';
import { ClassesRouter } from './routes/class.route';
import { UserRouter } from './routes/user.route';
import bodyParser from 'body-parser';
import { db } from './db';
import express from 'express';

const app = express();
const port = process.env.API_PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(AuthRouter.router);

app.use(ClassesRouter.router);

app.use(UserRouter.router);

app.use(AdminRouter.router);

app.listen(port, async () => {
	try {
		await db.init();
		console.log(`Database started on localhost:${process.env.DB_PORT}`);
		console.log(`Server started on port ${port}`);
	} catch (error) {
		console.log(error);
	}
});
