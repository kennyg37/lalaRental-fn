import { Link, useNavigate } from "react-router-dom";
import { IListing } from "../../interfaces/listing";
import ListingCard from "../ListingCard";

export default function BooksOverview({ listings }: { listings: IListing[] }) {
  return (
    <article className="padd py-8 flex justify-betwee items-start gap-6">
      <section className="w-4/6 flex flex-col gap-6">
        <section className="p-8 bg-white w-full" id="new-releases">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-serif">New Releases</h2>
            <Link to="/books">View More</Link>
          </div>
          <section className="flex justify-between gap-6 items-start w-full px-6">
            {listings
              .filter((elt) => elt.offers === "Limited Time")
              .slice(0, 4)
              .map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
          </section>
        </section>
        <section className="p-8 bg-white w-full" id="best-seller">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold font-serif">Best Offers</h2>
            <Link to="/listings">View More</Link>
          </div>
          <section className="flex justify-between gap-6 w-full">
            {listings
              .filter((elt) => elt.offers === "Discount")
              .slice(0, 4)
              .map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
          </section>
        </section>
      </section>
      <section className="bg-white w-2/6 p-6">
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-2xl font-bold font-serif">Special offers</h2>
          <Link to="/listings">View More</Link>
        </div>
        <section className="grid grid-cols-1 gap-4">
          {listings
            .filter((elt) => elt.tags.includes("Special Offer"))
            .slice(0, 4)
            .map((listing, i) => (
              <ListingCardRow key={listing._id} id={i} listing={listing} />
            ))}
        </section>
      </section>
    </article>
  );
}

function ListingCardRow({ listing, id }: { listing: IListing; id: number }) {
  const navigate = useNavigate();
  return (
    <article
      className="flex items-center justify-between"
      onClick={() => navigate(`/listings/${listing._id}`)}
    >
      <p className="font-bold font-serif text-3xl">{id + 1}</p>
      <section className="w-11/12 flex items-center gap-4">
        <img
          src={listing.image[0]}
          className="w-1/3 h-40 object-cover"
          alt={listing.title}
        />

        <div className="flex flex-col gap-4">
          <h2 className="font-bold font-serif">{listing.title}</h2>
          <p className="-mt-3">
            {listing.hostId.firstName} {listing.hostId.lastName}
          </p>
          <p className="font-bold text-primary text-lg">{listing.price}$</p>
        </div>
      </section>
    </article>
  );
}
