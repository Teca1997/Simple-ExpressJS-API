import 'types';

declare global {
	namespace NodeJs {
		interface ProcessEnv {
			DB_USERNAME: string;
			DB_HOST: string;
			DB_DATABASE: string;
			DB_PASSWORD: string;
			DB_SCHEMA: string;
			DB_PORT: string;
			DB_LOGGING: string;
			DB_SYNCHRONISE: string;
			DB_DROPDB: string;
			DB_TYPE: string;
			PORT: string;
			TOKEN_KEY: string;
			EMAIL_FROM: string;
		}
	}
}
