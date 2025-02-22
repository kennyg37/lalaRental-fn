import axios from "axios";
import { CloudinaryUrl, PresetKey } from "./env";

export async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", PresetKey);

  const response = await axios.post(CloudinaryUrl, formData);

  return response.data.url;
}
