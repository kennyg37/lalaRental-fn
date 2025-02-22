import { useNavigate } from "react-router";
import { IListing } from "../interfaces/listing";
import CustomButton from "./button";

interface ListingCardProps {
  listing: IListing;
}
export default function ListingCard({ listing }: ListingCardProps) {
  const navigate = useNavigate();
  return (
    <article className="w-full relative">
      {/* Render the first three images */}
      <div className="flex justify-between gap-2">
        {listing.image.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${listing.title} - Image ${index + 1}`}
            className="w-1/3 h-72 object-cover"
          />
        ))}
      </div>
      <section className="p-4">
        <h2 className="font-bold">
          {listing.title.length > 20
            ? `${listing.title.slice(0, 20)}...`
            : listing.title}
        </h2>
        <p className="text-sm text-gray-500">
          {listing.hostId.firstName} {listing.hostId.lastName}
        </p>
      </section>
      <section className="flex justify-between items-center px-2">
        <p className="text-xl text-primary">{listing.price}$</p>
        <CustomButton
          variant="secondary"
          text="Buy"
          onClick={() => navigate(`/listings/${listing._id}`)}
        />
      </section>
      {listing.offers && <Banner key={listing._id} banner={listing.offers} />}
    </article>
  );
}

function Banner({ banner }: { banner: string }) {
  const colors: { [key: string]: string } = {
    "New Release": "bg-green-500",
    Sale: "bg-blue-500",
    Discount: "bg-red-500",
    "Pre Sale": "bg-primary",
    "In Stock": "bg-primary ",
  };

  return (
    <div
      className={`text-white w-fit px-4 text-sm py-1 absolute top-2 -right-4 ${colors[banner]}`}
    >
      {generateText(banner)}
    </div>
  );
}

function generateText(text: string) {
  const discount = Math.floor(Math.random() * 20) + 1;

  return text === "New Release"
    ? "New"
    : text === "Pre Sale"
    ? "Pre-Sale"
    : text === "In Stock"
    ? "In Stock"
    : text === "Sale"
    ? "Sale"
    : text === `Discount`
    ? `${discount}% Off`
    : "";
}
