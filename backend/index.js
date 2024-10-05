import express from "express";
import http from "http";
import cors from "cors";

import dotenv from 'dotenv'

dotenv.config();
//
import { ApolloServer } from "@apollo/server";
//
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
//
import mergedResolvers from "./resolvers/mergedResolvers.js";
import mergedTypeDefs from "./typedefs/mergedTypeDefs.js";
//
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

await new Promise((res) => httpServer.listen({ port: process.env.PORT }, res));

console.log(`🚀 Server ready at ${process.env.PORT} port`);
