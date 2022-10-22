FROM node:16 as build

WORKDIR /orsive-api

COPY . .

RUN npm install

WORKDIR /orsive-api/apps/api

RUN npx prisma generate

RUN npm run build

FROM node:16 as main

LABEL org.opencontainers.image.source=https://github.com/pranav377/orsive
LABEL org.opencontainers.image.description="Orsive API"
LABEL org.opencontainers.image.licenses=AGPL-3.0-only

COPY --from=build /orsive-api /orsive-api

WORKDIR /orsive-api

EXPOSE 4000

CMD [ "node" , "apps/api/dist/apps/api/app.js"]