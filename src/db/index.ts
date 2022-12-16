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

const maxConnectionTries = 5;
const retryRateMiliseconds = 1000;
const init = async (connectionRetries = maxConnectionTries) => {
	console.log('Initializing database.');

	while (connectionRetries) {
		try {
			await AppDataSource.initialize();
			console.log('Database initialized!');
			if (process.env.DB_SYNCHRONISE === 'true' ? true : false) {
				await syncDatabase();
			}
			if (process.env.DB_SEED === 'true' ? true : false) {
				await seedDatabase();
			}
			return;
		} catch (error) {
			connectionRetries -= 1;
			if (!connectionRetries) {
				console.log(
					`
						Failed connecting to the database after ${maxConnectionTries} tries. API shuting down!!!\n
						Run npm run dev --clear-cache to start the server again.
					`
				);
				process.exit();
			}
			console.log('Error occured while connecting to the database.');
			console.log(`${error.message}`);
			console.log(`Retries left:${connectionRetries}\n`);
			await new Promise(async (res) => setTimeout(res, retryRateMiliseconds));
		}
	}
	return;
};

const syncDatabase = async (): Promise<void> => {
	console.log('Database sync started.');
	await AppDataSource.synchronize(process.env.DB_DROP_TABLES_ON_SYNC === 'true' ? true : false);
	console.log(
		process.env.DB_DROP_TABLES_ON_SYNC === 'true'
			? 'Tables dropped and database synced'
			: 'Database synced'
	);
	return;
};

const seedDatabase = async (): Promise<void> => {
	console.log('Database seeding started.');
	await AppDataSource.createQueryBuilder().insert().into(Role).values(RoleSeed).execute();

	await AppDataSource.createQueryBuilder()
		.insert()
		.into(ClassType)
		.values(ClassTypeSeed)
		.execute();

	await AppDataSource.createQueryBuilder().insert().into(Sport).values(SportSeed).execute();

	await AppDataSource.createQueryBuilder()
		.insert()
		.into(SportClass)
		.values(SportClassSeed)
		.execute();

	await AppDataSource.createQueryBuilder().insert().into(User).values(UserSeed).execute();

	await AppDataSource.createQueryBuilder()
		.insert()
		.into(UserSportClass)
		.values(UserSportClassSeed)
		.execute();

	await AppDataSource.createQueryBuilder().insert().into(Token).values(TokenSeed).execute();

	await AppDataSource.createQueryBuilder().insert().into(Rating).values(RatingSeed).execute();
	console.log('Database seeded');
	return;
};

export const db = { init };
export const queryBuilder = AppDataSource.createQueryBuilder();
export const roleRepo = AppDataSource.getRepository<Role>('role');
export const sportRepo = AppDataSource.getRepository<Sport>('sport');
export const tokenRepo = AppDataSource.getRepository<Token>('token');
export const userRepo = AppDataSource.getRepository<User>('user');
export const sportClassRepo = AppDataSource.getRepository<SportClass>('sport_class');
export const userSportClassRepo = AppDataSource.getRepository<UserSportClass>('user_sport_class');

export const commentRepo = AppDataSource.getRepository<Comment>('comment');
export const ratingRepo = AppDataSource.getRepository<Rating>('rating');
