FROM node:16

WORKDIR /orsive-dev

COPY . .

RUN npm install

WORKDIR /orsive-dev/apps/api

RUN npm run generate

WORKDIR /orsive-dev

EXPOSE 4000
EXPOSE 3000
EXPOSE 19000

CMD [ "npm" , "run", "dev"]