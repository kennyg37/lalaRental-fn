import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import HomePage from "./pages/homePage";
import NotFound from "./pages/notFound";
import authLoader from "./loaders/authLoader";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import homeLoader from "./loaders/unAuthLoader";
import Header from "./components/header";
import CartPage from "./pages/cart";
import BooksPage from "./pages/booksPage";
import ViewBook from "./pages/viewBook";
import BlogsPage from "./pages/blogsPage";
import AddBook from "./pages/addBook";

export default function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Header />} path="/">
        <Route index element={<HomePage />} />
        <Route loader={homeLoader}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route loader={authLoader}>
          <Route path="cart" element={<CartPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="books/add" element={<AddBook />} />
          <Route path="books/:id" element={<ViewBook />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <article>
      <RouterProvider router={route} />
      <Toaster position="top-center" reverseOrder={false} />
    </article>
  );
}
