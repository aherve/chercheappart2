FROM alpine:latest
RUN apk add --no-cache nodejs

RUN npm install -g nodemon

RUN mkdir -p /app/
WORKDIR /app

ADD package.json .
RUN npm install

CMD nodemon ./src/index.js
