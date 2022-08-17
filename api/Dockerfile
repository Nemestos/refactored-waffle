FROM node:16-alpine as install
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY  . /usr/src/app

