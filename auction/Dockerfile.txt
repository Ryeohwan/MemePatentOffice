FROM adoptopenjdk:11-hotspot AS builder
# env 
ENV USERNAME username
ENV PASSWORD pwd
ENV HOST localhost
ENV PORT 27017
ENV DATABASE osakak

# env finish
COPY server/gradlew .
COPY server/gradle gradle
COPY server/build.gradle .
COPY server/settings.gradle .
COPY server/src src
RUN chmod +x ./gradlews
RUN ./gradlew clean bootJar

FROM adoptopenjdk:11-hotspot
COPY --from=builder build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar", "-datasource.username=${USERNAME}", "-datasource.password=${PASSWORD}", "-datasource.url=${HOST}", "/app.jar"]
