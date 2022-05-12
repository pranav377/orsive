import { ApolloServer, AuthenticationError } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import path from "path";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { rateLimitDirective } from "graphql-rate-limit-directive";

import session from "express-session";
import passport from "passport";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import prisma from "./graphql/utils/data/dbClient";
import bcrypt from "bcrypt";
import { userOptions } from "./graphql/resolvers/auth/controllers/auth.controller";
import { discordStrat, googleStrat } from "./oauthStrategies";
const MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "Sessions",
  resave: false,
  saveUninitialized: false,
});

store.on("error", function (error: Error) {
  console.log(error);
});

passport.use(
  new GraphQLLocalStrategy(async (email: any, password: any, done) => {
    let error = null;
    let matchingUser = null;
    if (email && password) {
      const user = await prisma.profile.findFirst({
        where: {
          email: email,
          authMethod: "local",
        },
        ...userOptions,
      });

      let valid = null;

      if (!user) {
        error = new AuthenticationError("Error signing in");
      } else {
        valid = await bcrypt.compare(password, user.password);
      }

      if (!valid) {
        error = new AuthenticationError("Error signing in");
      }

      matchingUser = user;
    } else {
      error = new AuthenticationError("Error signing in");
    }
    done(error, matchingUser);
  })
);

passport.use(discordStrat);
passport.use(googleStrat);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id: string, done) {
  let user = await prisma.profile.findUnique({
    where: { id },
    include: {
      roles: true,
    },
  });
  done(null, user);
});

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective();

let schema = makeExecutableSchema({
  typeDefs: [rateLimitDirectiveTypeDefs, ...typeDefs],
  resolvers,
}) as any;

schema = rateLimitDirectiveTransformer(schema);

async function startServer() {
  const server = new ApolloServer({
    schema,
    plugins:
      process.env.NODE_ENV === "production"
        ? [ApolloServerPluginLandingPageDisabled()]
        : [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => buildContext({ req, res }),
  });
  await server.start();

  const app = express();
  app.use(
    session({
      secret: process.env.JWT_SECRET!,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      },
      store: store,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(graphqlUploadExpress());

  app.get("/auth/discord", passport.authenticate("discord"));
  app.get(
    "/auth/discord/callback",
    passport.authenticate("discord", {
      failureRedirect: "/graphql",
    }),
    function (_req, res) {
      res.redirect(process.env.OAUTH_SUCCESS_REDIRECT_URL!); // Successful auth
    }
  );

  app.get("/auth/google", passport.authenticate("google"));

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/graphql" }),
    function (_req, res) {
      res.redirect(process.env.OAUTH_SUCCESS_REDIRECT_URL!);
    }
  );

  if (process.env.NODE_ENV != "production") {
    app.use("/uploads", express.static(path.join(__dirname, "uploads-dev")));
  }

  server.applyMiddleware({
    app,
    cors: {
      origin: [
        "http://localhost:3000",
        "https://orsive.com",
        "https://www.orsive.com",
      ],
      credentials: true,
    },
  });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at localhost:4000${server.graphqlPath}`);

  if (process.env.NODE_ENV === "production") {
    console.log("Running in Production");
  }
}

startServer();
