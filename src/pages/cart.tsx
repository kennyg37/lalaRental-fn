import { useCartContext } from "../context/cartContext";
import { IListing } from "../interfaces/listing";

export default function CartPage() {
  const { listings } = useCartContext();

  const total = listings.reduce((acc, listing) => acc + listing.price, 0);

  return (
    <article className="flex justify-between">
      <section className="w-3/5 padd-l py-12 pr-12">
        <h1 className="font-bold font-serif text-3xl mb-8">My shopping Cart</h1>
        <section className="flex flex-col gap-6">
          {total ? (
            listings.map((listing) => <CartCard key={listing._id} listing={listing} />)
          ) : (
            <section className="w-full h-72 grid place-content-center font-semibold text-lg ">
              No Orders in cart
            </section>
          )}
        </section>
      </section>
      <section className="w-2/5 padd-r bg-primary/10 py-12 pl-12">
        <h1 className="font-bold font-serif text-3xl mb-8">My Order</h1>
      </section>
    </article>
  );
}

function CartCard({ listing }: { listing: IListing }) {
  const { removeListing } = useCartContext();
  return (
    <article className="flex gap-5">
      <img src={listing.image[0]} className="h-48 w-1/6 object-cover" alt="" />
      <section className="w-5/6 flex flex-col justify-center gap-12">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg">{listing.title}</h1>
            <p className="font- text-sm">
              {listing.hostId.firstName} {listing.hostId.lastName}
            </p>
          </div>
          <button
            onClick={() => removeListing(listing)}
            className="flex items-center gap-2"
          >
            <p>Remove</p>
            <img
              src="/icons/delete.png"
              className="w-4 h-4 object-contain"
              alt=""
            />
          </button>
        </section>
        {/* <section> */}
        <p className="font-bold text-lg text-primary">{listing.price}</p>
        {/* </section> */}
      </section>
    </article>
  );
}
