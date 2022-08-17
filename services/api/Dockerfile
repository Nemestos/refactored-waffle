FROM node:16-alpine as install
WORKDIR /usr/src/app
COPY ./api/package.json ./
RUN yarn install --frozen-lockfile
COPY ./api/ .

