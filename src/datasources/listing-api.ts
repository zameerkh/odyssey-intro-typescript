import { RESTDataSource } from "@apollo/datasource-rest";
import { Listing, Amenity } from "../types";

export class ListingAPI extends RESTDataSource {
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

  getFeaturedListings(): Promise<Listing[]> {
    return this.get<Listing[]>("featured-listings");
  }

  getListing(listingId: string) {
    return this.get<Listing>(`listings/${listingId}`);
  }

  getAmenities(listingId: string): Promise<Amenity[]> {
    return this.get<Amenity[]>(`listings/${listingId}/amenities`);
  }
}
