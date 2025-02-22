import { useEffect, useState } from "react";
import { IListing } from "../interfaces/listing";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../utils/env";
import getAuthToken from "../utils/getAuthToken";

export default function useListings() {
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchListings() {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/listings`);
      const data = await res.data;
      setListings(data);
    } catch (error) {
      toast.error("An error occurred, Try again!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return { listings, loading };
}

export function useListing(id: string) {
  const [listing, setListing] = useState<IListing | null>(null);
  const [loading, setLoading] = useState(true);

  const token = getAuthToken();

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await axios.get(`${apiUrl}/listings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.data;
        setListing(data);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred, Try again!");
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, []);

  return { listing, loading };
}
