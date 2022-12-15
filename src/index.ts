import { AdminDashboardRouter } from "./routes/adminDashboard.route";
import { AuthRouter } from "./routes/auth.route";
import { ClassesRouter } from "./routes/class.route";
import { UserRouter } from "./routes/user.route";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(AuthRouter.router);

app.use(ClassesRouter.router);

app.use(UserRouter.router);

app.use(AdminDashboardRouter.router);

app.listen(port, () => console.log(`Server started on port ${port}`));
