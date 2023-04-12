FROM adoptopenjdk:11-hotspot AS builder
# env 
ENV USERNAME username
ENV PASSWORD pwd
ENV HOST localhost
ENV PORT 88888
ENV DATABASE orange

# env finish

COPY mpoffice/gradlew .
COPY mpoffice/gradle gradle
COPY mpoffice/build.gradle .
COPY mpoffice/settings.gradle .
COPY mpoffice/src src
RUN chmod +x ./gradlew
RUN ./gradlew clean bootJar

FROM adoptopenjdk:11-hotspot
COPY --from=builder build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar", "-Dspring.datasource.username=${USERNAME}", "-Dspring.datasource.password=${PASSWORD}", "-Dspring.datasource.url=${HOST}", "/app.jar"]
