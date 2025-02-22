import { IListing } from "../../interfaces/listing";

export default function AboutHost({ listing }: { listing: IListing }) {
  return (
    <article className="bg-primary/10 padd py-12">
      <p className="font-bold font-serif text-3xl mb-12">About The Host</p>
      <section className="flex items-center gap-32 justify-center">
        <div className="flex flex-col items-center gap-1">
          <img
            src={listing.hostId.image}
            className="w-40 h-40 rounded-full object-cover"
            alt=""
          />
          <p className="font-bold font-serif text-lg">
            {listing.hostId.firstName} {listing.hostId.lastName}
          </p>
        </div>
      </section>
    </article>
  );
}
