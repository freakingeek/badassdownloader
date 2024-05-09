FROM node:22.1-alpine3.18

WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN apk update && apk add chromium

CMD npm start