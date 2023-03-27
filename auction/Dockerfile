FROM adoptopenjdk:11-hotspot AS builder
# env
ENV PASSWORD password

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

ENTRYPOINT ["java","-jar", "-Dspring.redis.password=${PASSWORD}", "/app.jar"]