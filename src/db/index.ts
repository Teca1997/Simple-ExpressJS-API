import { ClassType } from "../models/ClassType";
import { ClassTypeSeed } from "./seeds/ClassTypeSeed";
import { DataSource } from "typeorm";
import { Role } from "../models/Role";
import { RoleSeed } from "./seeds/RoleSeed";
import { Sport } from "../models/Sport";
import { SportClass } from "../models/SportClass";
import { SportClassSeed } from "./seeds/SportClassSeed";
import { SportSeed } from "./seeds/SportSeed";
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
  poolSize: 15,
  logging: process.env.DB_LOGGING === "true" ? true : false,
});

AppDataSource.initialize().then(async () => {
  await AppDataSource.synchronize(true);

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Role)
    .values(RoleSeed)
    .returning("*")
    .execute();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(ClassType)
    .values(ClassTypeSeed)
    .returning("*")
    .execute();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Sport)
    .values(SportSeed)
    .returning("*")
    .execute();

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(SportClass)
    .values(SportClassSeed)
    .returning("*")
    .execute();
});

export const db = AppDataSource;
export const queryBuilder = db.createQueryBuilder();
export const roleRepo = db.getRepository("role");
export const sportRepo = db.getRepository("sport");
export const tokenRepo = db.getRepository("token");
export const userRepo = db.getRepository("user");
export const sportClassRepo = db.getRepository("sport_class");
export const tokenType = db.getRepository("token_type");
