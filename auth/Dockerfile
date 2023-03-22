FROM adoptopenjdk:11-hotspot AS builder
# env 
ENV REDIS_PASSWORD redis_pwd

# env finish
COPY auth/gradlew .
COPY auth/gradle gradle
COPY auth/build.gradle .
COPY auth/settings.gradle .
COPY auth/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM adoptopenjdk:11-hotspot
COPY --from=builder build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar", "-Dspring.redis.password=${REDIS_PASSWORD}", "/app.jar"]
