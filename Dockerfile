FROM node:22.1-alpine3.18

ARG BOT_TOKEN

WORKDIR /usr/src/app

ENV BOT_TOKEN ${BOT_TOKEN}
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN apk update && apk add chromium

CMD npm start