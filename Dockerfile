# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install -g gzipper
COPY ./ /app/
ARG configuration=sandbox
RUN npm run build --prod --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
#Remove index.html from /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/index.html
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf