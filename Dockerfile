FROM node:20 AS build

WORKDIR /app

COPY api/package.json /app

RUN npm install

COPY /api /app

FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3

COPY --from=build /app /app

RUN npm install --production && npm rebuild sqlite3

EXPOSE 3000

CMD ["node", "main.js"]