#Definicion
FROM node:16.16.0-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Puesta en marcha 
FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/crud-angular /usr/share/nginx/html