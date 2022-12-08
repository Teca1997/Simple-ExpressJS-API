import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { queryBuilder } from "../db";

export class UserService {
  static async addUser(_userData: any): Promise<number | undefined> {
    try {
      _userData.password = await bcrypt.hash(_userData.password, 12);
    } catch (error) {
      console.log("Error hashing password: " + error);
    }

    try {
      const insertResult = await queryBuilder
        .insert()
        .into(User)
        .values(_userData)
        .returning("id")
        .execute();
      return insertResult.raw[0].id;
    } catch (error) {
      console.log("Error inserting new user: " + error);
    }
    return;
  }
}
