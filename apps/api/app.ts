import { ApolloServer, AuthenticationError } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import express from "express";
import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import path from "path";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { rateLimitDirective } from "graphql-rate-limit-directive";
import passport from "passport";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";
import prisma from "./graphql/utils/data/dbClient";
import bcrypt from "bcrypt";
import {
  getUserJwtToken,
  userOptions,
} from "./graphql/resolvers/auth/controllers/auth.controller";
import { discordStrat, googleStrat } from "./oauthStrategies";
import { JWT_SECRET } from "./graphql/config";
import passportJWT from "passport-jwt";
import { graphqlUploadExpress } from "graphql-upload";

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

passport.use(
  new passportJWT.Strategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      prisma.profile
        .findUnique({
          where: {
            id: payload.id,
          },
          include: {
            roles: true,
          },
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);

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
  app.use(passport.initialize());
  app.use("/graphql", (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (_err, user, _info) => {
      if (user) {
        req.user = user;
      }

      next();
    })(req, res, next);
  });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 20000000,
      maxFiles: 10,
      maxFieldSize: 20000000,
    })
  );

  app.get("/", (_req, res) => {
    res.end("Cluster Up and running");
  });
  app.get(
    "/auth/discord",
    passport.authenticate("discord", {
      session: false,
    })
  );
  app.get(
    "/auth/discord/callback",
    passport.authenticate("discord", {
      failureRedirect: "/graphql",
      session: false,
    }),
    function (req, res) {
      res.json({
        token: getUserJwtToken(req.user),
      });
    }
  );

  app.get("/auth/google", passport.authenticate("google"));

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/graphql",
      session: false,
    }),
    function (req, res) {
      res.json({
        token: getUserJwtToken(req.user),
      });
    }
  );

  if (process.env.NODE_ENV != "production") {
    app.use("/uploads", express.static(path.join(__dirname, "uploads-dev")));
  }

  server.applyMiddleware({
    app,
    cors:
      process.env.NODE_ENV === "production"
        ? {
            origin: ["https://orsive.com", "https://www.orsive.com"],
            credentials: true,
          }
        : {
            origin: ["http://localhost:3000"],
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
