import { categories } from "../../constants/filters";
import { ListingCategory } from "../../interfaces/enums";
import { ListingFilters } from "../../pages/booksPage";
import CustomButton from "../button";

export default function ListingCategorySection({
  filters,
  handleFilterChange,
}: {
  filters: ListingFilters;
  handleFilterChange: <K extends keyof ListingFilters>(
    filter: K,
    value: ListingFilters[K]
  ) => void;
}) {
  return (
    <article className="padd py-10 border-b border-gray-300 flex flex-col gap-8">
      <h1 className="font-bold font-serif text-3xl">
        {filters.category ? filters.category + " Books" : "All Books"}
      </h1>
      <section>
        <section className="flex flex-nowrap items-center overflow-auto gap-4 mt-2 no-scrollbar">
          {categories.map((category) => {
            const value =
              category === "All" ? null : (category as ListingCategory);
            return (
              <div key={category} className="w-fit">
                <CustomButton
                  onClick={() => handleFilterChange("category", value)}
                  text={category}
                  variant={
                    filters.category === null && category === "All"
                      ? "five"
                      : filters.category === category
                      ? "five"
                      : "secondary"
                  }
                />
              </div>
            );
          })}
        </section>
      </section>
    </article>
  );
}
