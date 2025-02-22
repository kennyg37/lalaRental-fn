import { useMemo } from "react";
import { IListing } from "../../interfaces/listing";
import ListingCard from "../ListingCard";

interface RecommendedProps {
  listings: IListing[];
}
export default function Recommended({ listings }: RecommendedProps) {
  const numbers = useMemo(() => {
    const randomNumbers = new Set<number>();
    const maxNumbers = Math.min(3, listings.length);

    while (randomNumbers.size < maxNumbers) {
      randomNumbers.add(Math.floor(Math.random() * listings.length));
    }

    return Array.from(randomNumbers);
  }, [listings.length]);

  return (
    <article className="padd py-10" id="recommendation">
      <p className="font-bold font-serif text-3xl text-center mb-10">
        Our Recommendations
      </p>
      <section className="flex justify-between items-start gap-8">
        {numbers.map((number) => {
          const listing = listings[number];
          return <ListingCard key={listing._id} listing={listing} />;
        })}
      </section>
    </article>
  );
}