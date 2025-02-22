import axios from "axios";
import getAuthToken from "./getAuthToken";
import { apiUrl } from "./env";
import toast from "react-hot-toast";

type Review = {
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
};
export async function reviewBook(id: string, review: Review) {
  const token = getAuthToken();
  const res = await axios.post(`${apiUrl}/book/${id}/review`, review, {
    headers: {
      hostization: `Bearer ${token}`,
    },
  });

  const data = res.data;

  if (res.status !== 201) {
    toast.error("Something went wrong. Please try again later.");
    return;
  }

  toast.success("Review submitted successfully!");
  return data;
}
