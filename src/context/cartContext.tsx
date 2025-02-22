import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IListing } from "../interfaces/listing";

interface CartContextType {
  listings: IListing[];
  addListing: (listing: IListing) => void;
  removeListing: (listing: IListing) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType>({
  listings: [],
  addListing: () => {},
  removeListing: () => {},
  clearCart: () => {},
});

export default function CartContextProvider({ children }: CartProviderProps) {
  const [listings, setlistings] = useState<IListing[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setlistings(cart);
  }, []);

  function addListing(listing: IListing) {
    if (listings.find((b) => b._id === listing._id)) {
      return;
    }
    setlistings((prevlistings) => [...prevlistings, listing]);
    localStorage.setItem("cart", JSON.stringify([...listings]));
  }

  function removeListing(listing: IListing) {
    setlistings((prevlistings) => prevlistings.filter((b) => b._id !== listing._id));
    localStorage.setItem("cart", JSON.stringify([...listings]));
  }

  function clearCart() {
    setlistings([]);
    localStorage.removeItem("cart");
  }

  return (
    <CartContext.Provider value={{ listings, addListing, removeListing, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
