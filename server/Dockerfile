ARG NODE_V=14-slim

FROM node:${NODE_V} AS development
# Need this module to support watch updates
# RUN apk add --no-cache procps
RUN apt-get update && apt-get install -y procps
WORKDIR /usr/src
COPY package*.json ./
RUN npm ci
ENV PATH=/usr/src/node_modules/.bin:$PATH
WORKDIR /usr/src/app
COPY . .
RUN npm run build


FROM node:${NODE_V} AS production
ENV NODE_ENV=production

WORKDIR /usr/src
COPY package*.json ./
RUN npm ci --only=production
ENV PATH=/usr/src/node_modules/.bin:$PATH
WORKDIR /usr/src/app
COPY package*.json ./

EXPOSE 3000

COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
