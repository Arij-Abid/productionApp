
# Docker Build Maven Stage
FROM maven:3.8.3-openjdk-11-slim AS build
# Copy folder in docker
WORKDIR /app
COPY ./ /app
RUN mvn clean install -DskipTests
# Run spring boot in Docker
FROM openjdk:11-jdk-slim
COPY --from=build /app/target/*.jar app.jar
ENV PORT 8081
EXPOSE $PORT
ENTRYPOINT ["java","-jar","-Xmx1024M","-Dserver.port=${PORT}","app.jar"]


