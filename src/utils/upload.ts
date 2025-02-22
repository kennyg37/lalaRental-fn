import { Except } from "type-fest";
import { IListing, ICreateListing } from "../interfaces/listing";
import axios from "axios";
import { apiUrl } from "./env";
import toast from "react-hot-toast";
import getAuthToken from "./getAuthToken";

const token = getAuthToken();

export async function uploadListing(
  listing: Except<
    ICreateListing,
    "_id" | "createdAt" | "updatedAt" | "availabilityStatus"
  >
): Promise<IListing | undefined> {
  try {
    const response = await axios.post<IListing>(`${apiUrl}/listing`, listing, {
      headers: {
        hostization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error("An error occurred, Try again!");
    throw new Error(JSON.stringify(error));
  }
}
