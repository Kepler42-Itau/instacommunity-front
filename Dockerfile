FROM node:14-buster-slim

WORKDIR  /frontend

COPY . .

RUN yarn

ENTRYPOINT [ "yarn", "dev" ]