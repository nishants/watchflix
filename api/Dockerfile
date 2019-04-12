FROM node:11.13.0-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN yarn --pure-lockfile
EXPOSE 3001
