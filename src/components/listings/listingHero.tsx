import { useCartContext } from "../../context/cartContext";
import { IListing } from "../../interfaces/listing";
import CustomButton from "../button";

export default function ListingHero({ listing }: { listing: IListing }) {
  const { listings, addListing, removeListing } = useCartContext();

  const isSelected = listings.find((b: IListing) => b._id === listing._id);

  function handleAddToCart() {
    addListing(listing);
  }

  function handleRemoveFromCart() {
    removeListing(listing);
  }

  return (
    <article className="bg-white padd py-12 flex gap-8">
      <img src={listing.image[0]} className="w-1/3 h-[32rem] object-cover" alt="" />
      <section className="w-2/3 flex flex-col justify-between">
        <section className="flex flex-col gap-4">
          <p className="font-bold font-serif text-3xl">{listing.title}</p>
          <p className="text-lg text-black/70 font-light">
            {listing.hostId.firstName} {listing.hostId.lastName}
          </p>
          <section className="flex gap-4 justify-between">
            <p className="text-lg font-thin text-black/70">
              {listing.category} ({listing.category})
            </p>
            <p className="text-lg font-thin text-black/70">{listing.location}</p>
            <p className="text-lg font-thin text-black/70">
              Description: {listing.description}
            </p>
          </section>
          <p>{listing.description.slice(0, 1000)}</p>
        </section>
        <section className="flex gap-5">
          <CustomButton
            text={isSelected ? "Remove From Cart" : "Add To Cart"}
            icon={isSelected ? undefined : "add-cart"}
            onClick={isSelected ? handleRemoveFromCart : handleAddToCart}
            variant="quaternary"
          />
          <CustomButton
            text={isSelected ? "Remove Hashback" : "Hashback"}
            onClick={isSelected ? handleRemoveFromCart : handleAddToCart}
          />
          <CustomButton
            text={isSelected ? "Kindle" : "Kindle $9.99"}
            onClick={isSelected ? handleRemoveFromCart : handleAddToCart}
          />
        </section>
      </section>
    </article>
  );
}

// function Ratings({ book }: { book: IBook }) {
//   const reviews = book.reviews.length;
//   const rating =
//     book.reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews;

//   return (
//     <section className="flex gap-4 items-center text-lg font-thin text-black/70">
//       <div className="flex">
//         <img
//           src={`/icons/${rating >= 1 ? "star" : "starb"}.png`}
//           className="w-4 h-4 object-contain"
//           alt=""
//         />
//         <img
//           src={`/icons/${rating >= 2 ? "star" : "starb"}.png`}
//           className="w-4 h-4 object-contain"
//           alt=""
//         />
//         <img
//           src={`/icons/${rating >= 3 ? "star" : "starb"}.png`}
//           className="w-4 h-4 object-contain"
//           alt=""
//         />
//         <img
//           src={`/icons/${rating >= 4 ? "star" : "starb"}.png`}
//           className="w-4 h-4 object-contain"
//           alt=""
//         />
//         <img
//           src={`/icons/${rating >= 5 ? "star" : "starb"}.png`}
//           className="w-4 h-4 object-contain"
//           alt=""
//         />
//       </div>
//       <p>{reviews} Reviews</p>
//     </section>
//   );
// }
