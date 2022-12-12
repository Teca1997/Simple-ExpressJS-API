import { APIControlller } from "../controllers/api.controller";
import { APIValidator } from "../validators/api.validator";
import express from "express";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.post(
  "/api/classes",
  validate(APIValidator.filterClases),
  APIControlller.getfilteredClases
);

export const APIRouter = { router };
