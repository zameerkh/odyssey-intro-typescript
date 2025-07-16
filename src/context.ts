import { ListingAPI } from "./datasources/listing-api";

export interface DataSourceContext {
  dataSources: {
    listingAPI: ListingAPI;
  };
}
