import { InsertResult } from "typeorm";
import { Token } from "../models/Token";
import jwt from "jsonwebtoken";
import { queryBuilder } from "../db";

export class TokenService {
  static generateToken(userId: number, tokenType: number): string {
    const payload = { userId, tokenType };
    return jwt.sign(payload, process.env.TOKEN_KEY || "secretkey");
  }

  static async generateEmailVerificationToken(
    userId: number,
    tokenType: number
  ) {
    let token = TokenService.generateToken(userId, tokenType);

    const newToken: InsertResult = await queryBuilder
      .insert()
      .into(Token)
      .values({ user: userId, token, tokenType: 1 })
      .returning("*")
      .execute();

    return token;
  }

  static async verifyToken(token: string) {
    jwt.verify(
      token,
      process.env.TOKEN_KEY || "secretkey",
      async (err, decodedData) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("payload");
        console.log(JSON.parse(JSON.stringify(decodedData)));
        await Token.use(
          JSON.parse(JSON.stringify(decodedData)).userId,
          JSON.parse(JSON.stringify(decodedData)).userId
        );
      }
    );
  }
}
