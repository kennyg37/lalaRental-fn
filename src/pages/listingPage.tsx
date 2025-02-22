import { useEffect, useState } from "react";
import {
  ListingCategory,
  ListingLocation,
  ListingOffer,
  ListingTag,
  ListingType
} from "../interfaces/enums";
import ListingCategorySection from "../components/listings/listingCategory";
import Aside from "../components/listings/aside";
import useListings from "../hooks/useListings";
import LoadingSection from "../components/loadingSection";
import ListingsGrid from "../components/listings/listingGrid";
import { IListing } from "../interfaces/listing";

export interface ListingFilters {
  category: ListingCategory | null;
  type: ListingType | null;
  tags: ListingTag | null;
  location: ListingLocation | null;
  offer: ListingOffer | null;
}

export default function ListingsPage() {
  const [filters, setFilters] = useState<ListingFilters>({
    category: null,
    type: null,
    tags: null,
    location: null,
    offer: null,
  });
  const [filteredListings, setFilteredListings] = useState<IListing[]>([]);
  const { listings, loading } = useListings();

  const handleFilterChange = <K extends keyof ListingFilters>(
    filter: K,
    value: ListingFilters[K]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  useEffect(() => {
    const filtered = listings.filter((listing: IListing) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === null) return true;
        if (key === "tags") {
          return listing.tags.includes(value as ListingTag);
        }
        if (key === "offer") {
          return listing.offers.includes(value as ListingOffer);
        }
        return listing[key as keyof IListing] === value;
      });
    });

    setFilteredListings(filtered);
  }, [filters, listings]);

  useEffect(() => {
    if (listings.length) {
      setFilteredListings(listings);
    }
  }, [listings]);

  return (
    <article>
      <ListingCategorySection
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <article className="flex justify-between">
        <Aside
          filters={filters}
          handleFilterChange={handleFilterChange}
          listings={listings}
        />
        <article className="padd-r pl-10 w-3/4 bg-blue-50 py-12">
          {loading ? <LoadingSection /> : <ListingsGrid listings={filteredListings} />}
        </article>
      </article>
    </article>
  );
}
