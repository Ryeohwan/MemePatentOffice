FROM node:16.18.16-airplain as builder
WORKDIR "/app"
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx
RUN mkdir /app
WORKDIR /app
RUN rm /etc/nginx/conf.d/default.conf
COPY .nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/build /app/build
EXPOSE 3070
CMD ["nginx", "-g", "daemon off;"]