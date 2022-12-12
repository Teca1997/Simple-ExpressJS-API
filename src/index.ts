import { APIRouter } from "./routes/api.route";
import { AuthRouter } from "./routes/auth.route";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded());

app.use(AuthRouter.router);

app.use(APIRouter.router);

app.listen(port, () => console.log(`Server started on port ${port}`));
