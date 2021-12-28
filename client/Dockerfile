FROM node:14-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.21.3-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
# Next line solved issue with react routing
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
