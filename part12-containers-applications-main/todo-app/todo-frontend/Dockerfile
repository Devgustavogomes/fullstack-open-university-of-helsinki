FROM node:22 as test-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

RUN npm test


FROM node:22 as build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build



FROM nginx:alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]