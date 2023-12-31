import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { Prisma, PrismaClient } from "@prisma/client";
import { Mutation, Query, AnalysisModule } from "./resolvers";
import { SetUpAnalysisModule } from "./resolvers/SetUpAnalysisModule";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    AnalysisModule,
    SetUpAnalysisModule,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready on ${url}`);
});
