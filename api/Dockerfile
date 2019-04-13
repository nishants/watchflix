FROM node:11.13.0-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN yarn --pure-lockfile
EXPOSE 3001

# Becase coverage information needs git branch, hence use node jessie for ci env.
FROM node:11.13.0 AS ci
RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN yarn --pure-lockfile
EXPOSE 3001
