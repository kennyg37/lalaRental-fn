import { BooksFilters } from "../pages/booksPage";

export function isFilterApplied(filters: BooksFilters) {
  return Object.values(filters).some((filter) => filter !== null);
}
