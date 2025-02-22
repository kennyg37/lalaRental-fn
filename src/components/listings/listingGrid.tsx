import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IListing } from "../../interfaces/listing";
import ListingCard from "../ListingCard";
import Loading from "react-loading";

const ListingsGrid = ({ listings }: { listings: IListing[] }) => {
  const [visiblelistings, setVisiblelistings] = useState<IListing[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setVisiblelistings(listings.slice(0, 12));
    setHasMore(listings.length > 12);
  }, [listings]);

  const loadMorelistings = () => {
    if (visiblelistings.length >= listings.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisiblelistings((prevlistings) => [
        ...prevlistings,
        ...listings.slice(prevlistings.length, prevlistings.length + 12),
      ]);
    }, 2000);
  };

  return (
    <InfiniteScroll
      dataLength={visiblelistings.length}
      next={loadMorelistings}
      hasMore={hasMore}
      loader={
        <div className="w-full grid place-content-center my-12">
          <Loading type="spin" color="#e96f1b" height={50} width={60} />
        </div>
      }
      endMessage={
        <p className="text-center pt-12 text-xl text-black/50">
          No more listings to display
        </p>
      }
    >
      <section className="grid grid-cols-4 gap-8">
        {visiblelistings.map((listing, index) => (
          <ListingCard key={index} listing={listing} />
        ))}
      </section>
    </InfiniteScroll>
  );
};

export default ListingsGrid;
