#first stage
FROM node:latest as node
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod

#second stage
FROM nginx:alpine
COPY --from=node /app/dist/sandbox /usr/share/nginx/html