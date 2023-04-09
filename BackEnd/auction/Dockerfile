FROM adoptopenjdk:11-hotspot AS builder
# env 
ENV USERNAME username
ENV PASSWORD pwd
ENV HOST localhost
ENV PORT 27017
ENV DATABASE osakak

# env finish
COPY auction/gradlew .
COPY auction/gradle gradle
COPY auction/build.gradle .
COPY auction/settings.gradle .
COPY auction/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM adoptopenjdk:11-hotspot
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8072
ENTRYPOINT ["java","-jar", "-Dspring.redis.password=${PASSWORD}", "/app.jar"]