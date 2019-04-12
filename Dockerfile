FROM node:11.13.0
RUN mkdir -p /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
COPY . /app/
COPY . /resources/

EXPOSE 3000
CMD [ "yarn", "start" ]
