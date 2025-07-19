import { Resolvers } from "../types";
import { DataSourceContext } from "../context";

// Helper function to validate amenities
const validateFullAmenities = (amenityList: any[]) => {
  return (
    amenityList &&
    amenityList.length > 0 &&
    amenityList.some((amenity) => "name" in amenity)
  );
};

export const resolvers: Resolvers<DataSourceContext> = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
    listing: (_, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
  Listing: {
    amenities: (parent, _, { dataSources }) => {
      return validateFullAmenities(parent.amenities)
        ? parent.amenities
        : dataSources.listingAPI.getAmenities(parent.id);
    },
  },
};
