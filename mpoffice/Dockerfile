FROM adoptopenjdk/openjdk11:jdk-11.0.10_9-alpine AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM adoptopenjdk/openjdk11:jre-11.0.10_9-alpine
COPY --from=builder build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-Dspring.profiles.active=${SERVER_MODE}","-jar","/app.jar"]
