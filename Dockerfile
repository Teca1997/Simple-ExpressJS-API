FROM node:15

WORKDIR /app

COPY ./ ./

CMD ["ts-node-dev", "./src/index.ts"]