import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import passport from "passport";
import session from "express-session";
import connectMongodbSession from "connect-mongodb-session";

dotenv.config();
//
//
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";
//
import mergedResolvers from "./resolvers/mergedResolvers.js";
import mergedTypeDefs from "./typedefs/mergedTypeDefs.js";
import connectDB from "./db/connectDB.js";
import congfigurePassport from "./passport/passport.config.js";
//
const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongodbSession(session);

///

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
store.on("error", (err) => console.log("error in index.js", err));
///
///
///
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false, //this option specifies whether to save the sesion to the store on every request
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    },
    store: store
  })
);
app.use(passport.initialize())
app.use(passport.session())
///
///
///


//
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	"/graphql",
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
	express.json(),
	// expressMiddleware accepts the same arguments:
	// an Apollo Server instance and optional configuration options
	expressMiddleware(server, {
		context: async ({ req, res }) => buildContext({ req, res }),
	})
);


await new Promise((res) => httpServer.listen({ port: process.env.PORT }, res));
await connectDB();
console.log(`🚀 Server ready at ${process.env.PORT} port`);
