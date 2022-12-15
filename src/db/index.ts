import { ClassType } from '../models/ClassType';
import { ClassTypeSeed } from './seeds/ClassTypeSeed';
import { Comment } from '../models/Comment';
import { DataSource } from 'typeorm';
import { Rating } from '../models/Rating';
import { RatingSeed } from './seeds/RatingSeed';
import { Role } from '../models/Role';
import { RoleSeed } from './seeds/RoleSeed';
import { Sport } from '../models/Sport';
import { SportClass } from '../models/SportClass';
import { SportClassSeed } from './seeds/SportClassSeed';
import { SportSeed } from './seeds/SportSeed';
import { Token } from '../models/Token';
import { TokenSeed } from './seeds/TokenSeed';
import { User } from '../models/User';
import { UserSeed } from './seeds/UserSeed';
import { UserSportClass } from '../models/UserSportClass';
import { UserSportClassSeed } from './seeds/UserSportClassSeed';
import dotenv from 'dotenv';

dotenv.config();
const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	schema: process.env.DB_SCHEMA,
	entities: ['./src/models/*.ts'],
	migrations: [],
	poolSize: 15,
	logging: process.env.DB_LOGGING === 'true' ? true : false
});

AppDataSource.initialize().then(async () => {
	await AppDataSource.synchronize(true);

	await AppDataSource.createQueryBuilder().insert().into(Role).values(RoleSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(ClassType).values(ClassTypeSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(Sport).values(SportSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(SportClass).values(SportClassSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(User).values(UserSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(UserSportClass).values(UserSportClassSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(Token).values(TokenSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(Rating).values(RatingSeed).execute();
});

export const db = AppDataSource;
export const queryBuilder = db.createQueryBuilder();
export const roleRepo = db.getRepository<Role>('role');
export const sportRepo = db.getRepository<Sport>('sport');
export const tokenRepo = db.getRepository<Token>('token');
export const userRepo = db.getRepository<User>('user');
export const sportClassRepo = db.getRepository<SportClass>('sport_class');
export const userSportClassRepo = db.getRepository<UserSportClass>('user_sport_class');

export const commentRepo = db.getRepository<Comment>('comment');
export const ratingRepo = db.getRepository<Rating>('rating');
