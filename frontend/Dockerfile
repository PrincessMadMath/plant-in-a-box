# https://collabnix.com/creating-your-first-react-app-using-docker/

# Stage 1
FROM node:16-alpine AS build

WORKDIR /app
COPY package.json .

RUN npm i --legacy-peer-deps
COPY . .
RUN npm run build:container

# Stage 2
FROM nginx:1.25
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html