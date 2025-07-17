import { Resolvers } from "../types";
import { DataSourceContext } from "../context";

export const resolvers: Resolvers<DataSourceContext> = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
    listing: (_, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
};
