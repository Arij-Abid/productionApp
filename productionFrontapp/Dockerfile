
# Stage 1: Build Angular app
FROM node:16.16.0 AS build-stage
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@13.4.0
RUN npm install
RUN ng build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine
#COPY --from=build-stage /app/dist/plantManagement /usr/share/nginx/html
