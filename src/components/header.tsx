import { Outlet, useLocation, useNavigate } from "react-router";
import Logo from "./logo";
import CustomButton from "./button";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Subheader from "./subheader";
import AuthHeader from "./authHeader";
import { useAuth } from "../context/authContext";
import UserButton from "./userButton";
import Footer from "./footer";
import { useCartContext } from "../context/cartContext";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { listings } = useCartContext();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (search === "") {
      toast.error("Please enter a search term");
      return;
    }
    console.log("searching for", search);
  }
  let showAuthHeader = pathname === "/login" || pathname === "/register";

  return (
    <article>
      {showAuthHeader ? (
        <AuthHeader />
      ) : (
        <>
          <section className="padd py-6 flex justify-between items-center border-b">
            <Logo />
            <form onSubmit={handleSearch} className="w-1/3 flex">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="py-1 px-8 w-full bg-gray-200 outline-none placeholder:font-light"
              />
              <button className="bg-primary p-2">
                <img
                  src="/icons/search.png"
                  className="w-5 object-contain"
                  alt=""
                />
              </button>
            </form>
            <section className="flex items-center gap-4">
              <div className="relative">
                <CustomButton
                  text="Cart"
                  onClick={() => navigate("/cart")}
                  icon="cart"
                />
                {listings.length > 0 && (
                  <div className="w-6 h-6 bg-primary font-bold text-white rounded-full absolute -top-3 -right-3 grid place-content-center">
                    {listings.length}
                  </div>
                )}
              </div>
              {user && <UserButton />}
            </section>
          </section>
          <section>
            <Subheader />
          </section>
        </>
      )}
      <section>
        <Outlet />
      </section>
      <Footer />
    </article>
  );
}
