import { ClassesValidator } from "../validators/class.validator";
import { authorize } from "../middlewares/auth";
import { classesControlller } from "../controllers/class.controller";
import express from "express";
import { validate } from "../middlewares/validate";

const router = express.Router();

//post
router
  .route("/classes")
  .post(
    validate(ClassesValidator.getfilteredClases),
    classesControlller.getfilteredClases
  );

router
  .route("/classes/enroll")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.enrollUserIntoClass),
    classesControlller.enrollUserIntoClass
  );

router
  .route("/classes/unroll")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.unrollUserIntoClass),
    classesControlller.unrollUserIntoClass
  );

router
  .route("/classes/rate")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.rateSportClass),
    classesControlller.rateSportClass
  );

router
  .route("/classes/comment")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.commentSportClass),
    classesControlller.commentSportClass
  );

//get
router.route("/classes/:classId").get(classesControlller.getClass);

export const ClassesRouter = { router };
