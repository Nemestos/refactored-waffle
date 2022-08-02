FROM node:18-alpine AS deps
WORKDIR /usr/src/app
COPY ./front/package.json ./front/yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:18-alpine AS builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./front .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN yarn build


FROM node:18-alpine AS runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD ["node_modules/.bin/next","start"]