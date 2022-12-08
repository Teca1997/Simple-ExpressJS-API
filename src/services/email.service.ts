import nodemailer, { Transporter } from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

export class EmailService {
  static testAccount: nodemailer.TestAccount;
  static transporter: Transporter;

  static async init() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "rupert55@ethereal.email",
        pass: "9c9JB5P9ykSEBzaQPu",
      },
    });
  }

  static sendEmail = async (to: string, subject: string, text: string) => {
    const msg = { from: "test", to: to, subject: subject, text: text };
    try {
      console.log(await this.transporter.sendMail(msg));
    } catch (error) {
      console.log("error sending email " + error);
    }
  };
}

EmailService.init();
