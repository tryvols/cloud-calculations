FROM node:14-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
COPY . .
CMD npm run build

FROM nginx:1.21.3-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
