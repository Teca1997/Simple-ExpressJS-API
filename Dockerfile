FROM node:19

WORKDIR /usr/api

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

RUN npm install