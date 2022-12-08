declare namespace NodeJs {
  interface ProcessEnv {
    PRODUCTION_MODE: string;
    COMPILER_USE_SWC: string;
    NODE_ENV: string;
    DB_SUPERUSERNAME: string;
    DB_SUPERPASSWORD: string;
    DB_USERNAME: string;
    DB_HOST: string;
    DB_DATABASE: string;
    DB_PASSWORD: string;
    DB_SCHEMA: string;
    DB_PORT: string;
    DB_LOGGING: string;
    DB_SYNCHRONISE: string;
    DB_DROPDB: string;
    DB_INSERTDATA: string;
  }
}
