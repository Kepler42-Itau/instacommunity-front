FROM node:14-buster-slim

WORKDIR  /frontend

COPY . .
COPY ../.env .

RUN yarn

ENTRYPOINT [ "yarn", "dev" ]
