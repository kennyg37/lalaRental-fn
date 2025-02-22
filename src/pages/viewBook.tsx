import { useParams } from "react-router";
import useListings, { useListing } from "../hooks/useListings";
import LoadingSection from "../components/loadingSection";
import Recommended from "../components/homepage/recommendedd";
import ListingHero from "../components/listings/listingHero";
import AboutAuthor from "../components/listings/aboutHost";

export default function ViewBook() {
  const { id } = useParams();
  const { listings, loading: listingloading } = useListings();
  const { listing, loading } = useListing(id!);

  if (loading || listingloading) {
    return <LoadingSection />;
  }

  return (
    <article>
      <ListingHero listing={listing!} />
      <Recommended listings={listings} />
      <AboutAuthor listing={listing!} />
    </article>
  );
}
