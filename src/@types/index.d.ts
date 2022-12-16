import 'types';

declare global {
	namespace NodeJs {
		interface ProcessEnv {
			DB_USERNAME: string;
			DB_HOST: string;
			DB_DATABASE: string;
			DB_PASSWORD: string;
			DB_PORT: string;
			DB_LOGGING: string;
			DB_SYNCHRONISE: string;
			DB_DROP_TABLES_ON_SYNC: string;
			DB_SEED: string;
			DB_TYPE: string;
			API_PORT: string;
			TOKEN_KEY: string;
			EMAIL_FROM: string;
			MAIL_SERVICE_USERNAME: string;
			MAIL_SERVICE_PASSWORD: string;
		}
	}
}
