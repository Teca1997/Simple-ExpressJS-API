import { Request, Response } from "express";

import { AuthValidator } from "../validators/auth.validator";
import { EmailService } from "../services/email.service";
import { TokenService } from "../services/token.service";
import { User } from "../models/User";
import { UserService } from "../services/user.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const validationResponse = AuthValidator.registration.validate(req.body);

    if (validationResponse.error) {
      return res.status(400).send(validationResponse.error.message);
    }

    if (await User.isEmailTaken(validationResponse.value.email)) {
      return res.status(400).send("Email already in use!");
    }

    if (await User.isUsernameTaken(validationResponse.value.username)) {
      return res.status(400).send("Username already in use!");
    }

    try {
      let userId = await UserService.addUser(validationResponse.value);
      let emailVerificationToken =
        await TokenService.generateEmailVerificationToken(userId!, 1);
      EmailService.sendEmail(
        validationResponse.value.email,
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
  }

  static async verifyEmail(req: Request, res: Response) {
    const validationResponse = AuthValidator.emailVerification.validate(
      req.body
    );

    if (validationResponse.error) {
      return res.status(400).send(validationResponse.error.message);
    }

    try {
      TokenService.verifyToken(validationResponse.value.token);
    } catch (error) {
      res.status(400).send("Bad token!");
    }

    return res.status(200).send("Email verified.");
  }
}
