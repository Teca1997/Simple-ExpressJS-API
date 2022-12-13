import { ClassesValidator } from "../validators/class.validator";
import { authorize } from "../middlewares/auth";
import { classesControlller } from "../controllers/classes.controller";
import express from "express";
import { validate } from "../middlewares/validate";

const router = express.Router();

//post
router
  .route("/classes")
  .post(
    validate(ClassesValidator.filterClases),
    classesControlller.getfilteredClases
  );

router
  .route("/classes/enroll")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.enrollClass),
    classesControlller.enrollUserIntoClass
  );

router
  .route("/classes/unroll")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.enrollClass),
    classesControlller.unrollUserIntoClass
  );

//get
router.route("/classes/:classId").get(classesControlller.getClass);

export const ClassesRouter = { router };
