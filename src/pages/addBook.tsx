import { useForm } from "react-hook-form";
import { IListing, ICreateListing } from "../interfaces/listing";
import { useState } from "react";
import Loading from "react-loading";
import { Except } from "type-fest";
import { useAuth } from "../context/authContext";
import { uploadImage } from "../utils/uploadImage";
import toast from "react-hot-toast";
import { uploadListing } from "../utils/upload";
import { useNavigate } from "react-router";

export default function AddBook() {
  const { register, handleSubmit } = useForm<IListing>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: IListing) {
    setLoading(true);
    try {
      const img = await uploadImage(image!);
      const newListing: Except<
        ICreateListing,
        "_id" | "createdAt" | "updatedAt" | "availabilityStatus"
      > = {
        title: data.title,
        description: data.description,
        hostId: {
          _id: user?._id!,
          firstName: user?.firstName!,
          lastName: user?.lastName!,
          email: user?.email!,
        },
        price: data.price,
        image: img,
        tags: data.tags,
        category: data.category,
        location: data.location,
        offers: data.offers,
      };

      await uploadListing(newListing);
      toast.success("listing added successfully");
      navigate("/listings");
    } catch (error) {
      toast.error("An error occurred, Try again!");
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
  }

  return (
    <article className="flex justify-center items-center padd">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white padd py-8 flex flex-col gap-4"
      >
        <p className="text-center font-bold font-serif text-3xl mb-6">
          Create Listing
        </p>
        <div className="w-full flex gap-4 md:flex-col">
          <label className="w-full flex flex-col gap-2 font-semibold">
            Title
            <input
              type="text"
              {...register("title")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
              placeholder="Book Title"
            />
          </label>
        </div>
        <label className="w-full flex flex-col gap-2 font-semibold">
          Description
          <textarea
            {...register("description")}
            className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
            placeholder="Book Description"
          />
        </label>
        <div className="w-full flex gap-4 md:flex-col">
          <label className="w-full flex flex-col gap-2 font-semibold">
            Price
            <input
              type="number"
              {...register("price")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
              placeholder="Book Price"
            />
          </label>
          <label className="w-full flex flex-col gap-2 font-semibold">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="font-normal px-6 py-1 outline-none border-none rounded-xl bg-blue-50"
            />
          </label>
        </div>
        <div className="w-full flex gap-4 md:flex-col">
          <label className="w-full flex flex-col gap-2 font-semibold">
            Category
            <select
              {...register("category")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Hotel">Hotel</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Studio">Studio</option>

            </select>
          </label>
          <label className="w-full flex flex-col gap-2 font-semibold">
            Location
            <select
              {...register("location")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
            >
              <option value="Suburban">suburban</option>
              <option value="Urban">urban</option>
              <option value="Rural">rural</option>
              <option value="Mountain">mountain</option>
              <option value="Beachfront">beachfront</option>
              
            </select>
          </label>
        </div>
        <div className="w-full flex gap-4 md:flex-col">
          {/* <label className="w-full flex flex-col gap-2 font-semibold">
            Language
            <select
              {...register("language")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </label> */}
          <label className="w-full flex flex-col gap-2 font-semibold">
            Offers
            <select
              {...register("tags")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
            >
              <option value="New Listing">New Listing</option>
              <option value="Hot Deal">Hot Deal</option>
              <option value="Price Drop">Price Drop</option>
              <option value="Premium">Premium</option>
              <option value="Featured">Featured</option>
              <option value="Recently Reduced">Recently Reduced</option>
            </select>
          </label>
        </div>
        {/* tags from tags enum have to be select */}
        <label className="w-full flex flex-col gap-2 font-semibold">
          Tags
          <select
            {...register("offers")}
            className="font-normal px-6 py-2 outline-none border-none rounded-xl bg-blue-50"
          >
            <option value="Discount">Discount</option>
            <option value="Special Offer">Special Offer</option>
            <option value="Early Bird">Early Bird</option>
            <option value="Limited Time">Limited Time</option>
          </select>
        </label>
        <button className="flex items-center justify-center bg-black text-white gap-4 text-lg px-10 py-2 font-semibold relative">
          {loading ? (
            <Loading color="#fff" type="spin" width={30} />
          ) : (
            "Add Listing"
          )}
        </button>
      </form>
    </article>
  );
}
