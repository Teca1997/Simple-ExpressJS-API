import { ClassesValidator } from "../validators/class.validator";
import { authorize } from "../middlewares/auth";
import { classesControlller } from "../controllers/class.controller";
import express from "express";
import { validate } from "../middlewares/validate";

const router = express.Router();

//post
router
  .route("/class/enroll")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.enrollUserIntoClass),
    classesControlller.enrollUserIntoClass
  );

router
  .route("/class/unroll")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.unrollUserIntoClass),
    classesControlller.unrollUserIntoClass
  );

router
  .route("/class/rate")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.rateSportClass),
    classesControlller.rateSportClass
  );

router
  .route("/class/comment")
  .post(
    authorize([2, 3]),
    validate(ClassesValidator.commentSportClass),
    classesControlller.commentSportClass
  );

//get
router.route("/class/:classId").get(classesControlller.getClass);

router.route("/class").get(classesControlller.getfilteredClases);

export const ClassesRouter = { router };
