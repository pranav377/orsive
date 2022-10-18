FROM node:16 as build

WORKDIR /orsive-api

COPY . .

RUN npm install

WORKDIR /orsive-api/apps/api

RUN npm run generate

RUN npm run build

FROM node:16 as main

COPY --from=build /orsive-api /orsive-api

WORKDIR /orsive-api

EXPOSE 4000

CMD [ "node" , "apps/api/dist/apps/api/app.js"]