# Domagoj_Petrekovic_task
To build Docker container execute `docker-compose up` in root directory of this repo.
.env file can be used to change some parameters of the container.
If .env is not present in the root directory docker-compose will put default values for variables it would usualy pull from .env. 
Those values are 
- DB_USERNAME - default "postgres"
- DB_DATABASE - default "postgres"
- DB_PASSWORD - default "postgres"
- DB_LOGGING - default "false"
- DB_SYNCHRONISE - default "true"
- DB_DROP_TABLES_ON_SYNC - default "true"
- DB_SEED - default "true"
- API_PORT - default "5000"
- TOKEN_KEY - default "secret_key"
- MAIL_SERVICE_USERNAME - default "florine.reichert@ethereal.email"
- MAIL_SERVICE_PASSWORD - default "TTxWNydEu8qRsJZRrY"

API documentation can be found here: [documentation](https://orange-trinity-547899.postman.co/workspace/bb6ef342-4d22-4f94-8a54-efe9da4ff508/api/81006d5a-a997-44ee-a2e4-623763cc02d1)
