import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./datasources/resolver";
import { ListingAPI } from "./datasources/listing-api";
import { DataSourceContext } from "./context";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  })
);

async function startApolloServer() {
  try {
    const server = new ApolloServer<DataSourceContext>({
      typeDefs,
      resolvers,
    });
    const { url } = await startStandaloneServer(server, {
      context: async (): Promise<DataSourceContext> => {
        const { cache } = server;
        // this object becomes our resolver's contextValue, the third positional argument
        return {
          dataSources: {
            listingAPI: new ListingAPI({ cache }),
          },
        };
      },
    });
    console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
  } catch (error) {
    console.error("Failed to start Apollo Server:", error);
    process.exit(1);
  }
}

startApolloServer();
