FROM node:14-buster-slim

WORKDIR  /frontend

COPY . .
COPY ../.env.local .

RUN yarn

ENTRYPOINT [ "yarn", "dev" ]
