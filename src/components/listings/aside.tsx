import { ListingFilters } from "../../pages/listingPage";
import { tags, languages, offers, types } from "../../constants/filters";
import { IListing } from "../../interfaces/listing";
import { ListingOffer, ListingTag } from "../../interfaces/enums";

export default function Aside({
  filters,
  listings,
  handleFilterChange,
}: {
  listings: IListing[]; 
  filters: ListingFilters;
  handleFilterChange: <K extends keyof ListingFilters>(filter: K, value: ListingFilters[K]) => void;
}) {
  return (
    <article className="padd-l w-1/4 pt-6 pb-12 border-r border-r-gray-300">
      {/* Listing Type Section */}
      <section className="py-6 border-b border-gray-300">
        <h1 className="font-bold font-serif text-xl">Listing Type</h1>
        <div className="pl-10 mt-6 flex flex-col gap-2">
          {types.map((type) => (
            <FilterRow
              listings={listings}
              handleFilterChange={handleFilterChange}
              filters={filters}
              filterKey="type"
              value={type}
              key={type}
            />
          ))}
        </div>
      </section>

      {/* listing Tags Section */}
      <section className="py-6 border-b border-gray-300">
        <h1 className="font-bold font-serif text-xl">Listing Tags</h1>
        <div className="pl-10 mt-6 flex flex-col gap-2">
          {tags.map((tag) => (
            <FilterRow
              listings={listings}
              handleFilterChange={handleFilterChange}
              filters={filters}
              filterKey="tags" // Updated for tags
              value={tag}
              key={tag}
            />
          ))}
        </div>
      </section>

      {/* Location Section (Using Languages) */}
      <section className="py-6 border-b border-gray-300">
        <h1 className="font-bold font-serif text-xl">Location</h1>
        <div className="pl-10 mt-6 flex flex-col gap-2">
          {languages.map((language) => (
            <FilterRow
              listings={listings}
              handleFilterChange={handleFilterChange}
              filters={filters}
              filterKey="location" // Updated to use 'location'
              value={language}
              key={language}
            />
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-6 border-b border-gray-300">
        <h1 className="font-bold font-serif text-xl">Offers</h1>
        <div className="pl-10 mt-6 flex flex-col gap-2">
          {offers.map((offer) => (
            <FilterRow
              listings={listings}
              handleFilterChange={handleFilterChange}
              filters={filters}
              filterKey="offer" 
              value={offer}
              key={offer}
            />
          ))}
        </div>
      </section>
    </article>
  );
}

function FilterRow<K extends keyof ListingFilters>({
  filters,
  filterKey,
  value,
  listings, // Fixed parameter name from 'listings' to 'listings'
  handleFilterChange,
}: {
  filters: ListingFilters;
  listings: IListing[]; // Adjusted to match IListing
  filterKey: K;
  value: ListingFilters[K];
  handleFilterChange: <K extends keyof ListingFilters>(filter: K, value: ListingFilters[K]) => void;
}) {
  const count =
    filterKey === "tags"
      ? listings.filter((listing) => listing.tags?.includes(value as ListingTag)).length
      : (filterKey as string) === "offers"
      ? listings.filter((listing) => listing.offers?.includes(value as ListingOffer)).length
      : listings.filter((listing) => listing[filterKey as keyof IListing] === value).length;

  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => {
        const newValue = filters[filterKey] === value ? null : value;
        handleFilterChange(filterKey, newValue); // Fix filter change to toggle value
      }}
    >
      <CheckBox isChecked={filters[filterKey] === value} />
      <div className="text-lg">
        {value}
        {"   "}
        <span className="font-thin text-black/50">({count})</span>
      </div>
    </button>
  );
}

function CheckBox({ isChecked }: { isChecked: boolean }) {
  return isChecked ? (
    <div className="w-6 h-6 bg-primary grid place-content-center">
      <img src="/icons/check.png" className="w-4 h-4 object-contain" alt="checked" />
    </div>
  ) : (
    <div className="w-6 h-6 border border-black"></div>
  );
}
