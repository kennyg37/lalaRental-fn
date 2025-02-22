import BooksOverview from "../components/homepage/booksOverview";
// import Clip from "../components/homepage/clip";
import Hero from "../components/homepage/hero";
import Recommended from "../components/homepage/recommendedd";
import LoadingSection from "../components/loadingSection";
import useListings from "../hooks/useListings";

export default function HomePage() {
  const { listings, loading } = useListings();

  if (loading) {
    return <LoadingSection />;
  }
  if (!listings.length) {
    return (
      <article>
        <section className="text-center py-10">
          <h2 className="text-2xl font-bold">No books available</h2>
        </section>
      </article>
    );
  }

  return (
    <article>
      <Hero listings={listings} />
      {/* <Clip /> */}
      <Recommended listings={listings} />
      <BooksOverview listings={listings} />
    </article>
  );
}
