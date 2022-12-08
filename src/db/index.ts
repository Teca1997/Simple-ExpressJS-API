import { DataSource } from "typeorm";
import { Role } from "../models/Role";
import { TokenType } from "../models/TokenType";
import dotenv from "dotenv";

dotenv.config();
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  schema: process.env.DB_SCHEMA,
  entities: ["./src/models/*.ts"],
  migrations: [],
  logging: process.env.DB_LOGGING === "true" ? true : false,
});

AppDataSource.initialize().then(async () => {
  await AppDataSource.synchronize(true);

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Role)
    .values([
      {
        name: "Unverified user",
        description: "User that did not verify their email adress.",
      },
      {
        name: "User",
        description: "User that verified their email adress.",
      },
      { name: "Admin", description: "System admin" },
    ])
    .returning("*")
    .execute();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(TokenType)
    .values([
      {
        type: "Email verification token",
      },
    ])
    .returning("*")
    .execute();
});

export const db = AppDataSource;
export const queryBuilder = db.createQueryBuilder();
