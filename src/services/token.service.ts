import { InsertResult } from "typeorm";
import { Token } from "../models/Token";
import jwt from "jsonwebtoken";
import { queryBuilder } from "../db";

export class TokenService {
  static generateToken(userId: number, tokenType: string): string {
    const payload = { userId, tokenType };
    return jwt.sign(payload, process.env.TOKEN_KEY || "secretkey");
  }

  static async generateEmailVerificationToken(
    userId: number,
    tokenType: string
  ) {
    let token = TokenService.generateToken(userId, tokenType);

    const newToken: InsertResult = await queryBuilder
      .insert()
      .into(Token)
      .values({ user: userId, token, tokenType: 1 })
      .returning("*")
      .execute();
    console.log(newToken.raw[0].token);

    return token;
  }
}
