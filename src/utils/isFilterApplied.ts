import { ListingFilters } from "../pages/listingPage";

export function isFilterApplied(filters:ListingFilters) {
  return Object.values(filters).some((filter) => filter !== null);
}
