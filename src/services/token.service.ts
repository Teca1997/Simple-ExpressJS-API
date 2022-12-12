import { Token } from "../models/Token";
import { getEnv } from "../util/getEnv";
import jwt from "jsonwebtoken";
import { queryBuilder } from "../db";

const generateToken = (payload: object): string => {
  return jwt.sign(payload, getEnv("TOKEN_KEY"));
};

const generateEmailVerificationToken = async (
  userId: number
): Promise<string> => {
  let token = TokenService.generateToken({
    type: "Email verification token",
    expiryDate: getNewExpiryDate(),
    userId: userId,
  });

  saveToken(token, userId);

  return token;
};

const verifyToken = async (token: string) => {
  jwt.verify(token, getEnv("TOKEN_KEY"), async (err, decodedData) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("payload");
    console.log(JSON.parse(JSON.stringify(decodedData)));
    await Token.use(token, JSON.parse(JSON.stringify(decodedData)).userId);
  });
};

const saveToken = async (token: string, userId: number) => {
  await queryBuilder
    .insert()
    .into(Token)
    .values({ user: userId, token })
    .execute();
};

const getNewExpiryDate = () => {
  let date = new Date();
  let expiryDate = new Date(date.setDate(date.getDate() + 1));
  return expiryDate;
};

export const TokenService = {
  generateEmailVerificationToken,
  generateToken,
  verifyToken,
  saveToken,
};
