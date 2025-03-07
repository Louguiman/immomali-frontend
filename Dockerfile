FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next ./dist

COPY package.json ./

RUN yarn install --production

CMD [ "node", "dist/main.js" ]
