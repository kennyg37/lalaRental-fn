import { useNavigate } from "react-router";
import CustomButton from "../button";
import { IListing } from "../../interfaces/listing";
import { useMemo } from "react";

interface HeroProps {
  listings: IListing[];
}

export default function Hero({ listings }: HeroProps) {
  const numbers = useMemo(() => {
    const randomNumbers = [];
    const maxNumbers = Math.min(3, listings.length); 

    for (let i = 0; i < maxNumbers; i++) {
      randomNumbers.push(Math.floor(Math.random() * listings.length));
    }

    return randomNumbers;
  }, [listings.length]);

  if (listings.length === 0) {
    return <p>No listings available.</p>; 
  }

  return (
    <article className="padd py-6 bg-black flex justify-between gap-6">
      {numbers.map((id) => {
        const listing = listings[id];
        return <HeroCard key={listing._id} listing={listing} />;
      })}
    </article>
  );
}

interface HeroCardProps {
  listing: IListing;
}

function HeroCard({ listing }: HeroCardProps) {
  const navigate = useNavigate();

  return (
    <article className="bg-white w-1/3 p-6 flex justify-between items-center gap-4">
      <section className="flex flex-col items-start gap-3 w-1/2">
        <h2 className="font-serif font-bold text-2xl">{listing.title}</h2>
        <p>
          {listing.hostId.firstName} {listing.hostId.lastName}
        </p>
        <CustomButton
          text="Learn More"
          onClick={() => navigate(`/listings/${listing._id}`)}
          variant="quaternary"
        />
      </section>
      <img
        src={listing.image[0]}
        className="w-1/2 h-60 object-cover"
        alt={listing.title}
      />
    </article>
  );
}