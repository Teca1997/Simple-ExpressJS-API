import { Request, Response } from "express";

import { AuthValidator } from "../validators/auth.validator";
import { EmailService } from "../services/email.service";
import { TokenService } from "../services/token.service";
import { User } from "../models/User";
import { UserService } from "../services/user.service";

const register = async (req: Request, res: Response) => {
  if (await User.isEmailTaken(req.body.email)) {
    return res.status(400).send("Email already in use!");
  }

  if (await User.isUsernameTaken(req.body.username)) {
    return res.status(400).send("Username already in use!");
  }

  try {
    let userId = await UserService.addUser(req.body);
    let emailVerificationToken =
      await TokenService.generateEmailVerificationToken(userId!);
    EmailService.sendEmail(
      req.body.email,
      "Email verification",
      emailVerificationToken
    );
    return res.status(200).send(
      `All data valid. 
          User saved to database. 
          Verification email sent. 
          Verification token: ${emailVerificationToken}`
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Server error occured. Please check server console.");
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  const validationResponse = AuthValidator.emailVerification.validate(req.body);

  if (validationResponse.error) {
    return res.status(400).send(validationResponse.error.message);
  }

  try {
    TokenService.verifyToken(validationResponse.value.token);
  } catch (error) {
    res.status(400).send("Bad token!");
  }

  return res.status(200).send("Email verified.");
};

export const AuthController = { register, verifyEmail };
