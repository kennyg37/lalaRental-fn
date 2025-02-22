import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { UserSignup } from "../models/user";
import { useState } from "react";
import { uploadImage } from "../utils/uploadImage";
import Loading from "react-loading";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<UserSignup>();
  const { register: userRegister } = useAuth();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  async function onSubmit(data: UserSignup) {
    setLoading(true);
    try {
      const img = await uploadImage(image!);
      await userRegister({ ...data, profilePicture: img });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
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
    <section className="flex flex-col gap-6 justify-center items-center py-12 padd">
      <h1 className="text-4xl font-bold font-serif">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 sm:w-full bg-gray-100 py-16 px-12 flex flex-col gap-6"
      >
        <div className="w-full flex gap-4 md:flex-col">
          <label className="w-full flex flex-col gap-2 font-semibold">
            First Name
            <input
              type="text"
              {...register("firstName")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            />
          </label>
          <label className="w-full flex flex-col gap-2 font-semibold">
            Last Name
            <input
              type="text"
              {...register("lastName")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            />
          </label>
        </div>
        <div className="w-full flex gap-4 md:flex-col">
          <label className="w-full flex flex-col gap-2 font-semibold">
            Email
            <input
              type="email"
              {...register("email")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            />
          </label>
          <label className="w-full flex flex-col gap-2 font-semibold">
            Location
            <input
              type="text"
              {...register("location")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            />
          </label>
        </div>
        <div className="w-full flex gap-4 md:flex-col">
          <label className="w-full flex flex-col gap-2 font-semibold">
            Phone
            <input
              type="text"
              {...register("phone")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            />
          </label>
          <label className="w-full flex flex-col gap-2 font-semibold">
            Password
            <input
              type="password"
              {...register("password")}
              className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            />
          </label>
        </div>
        <label className="w-full flex flex-col gap-2 font-semibold">
          Profile Picture
          <input
            type="file"
            onChange={handleImageChange}
            className="font-normal px-6 py-2 outline-none bg-white rounded-xl border border-black/20"
          />
        </label>
        <label className="w-full flex flex-col gap-2 font-semibold">
          Bio
          <textarea
            placeholder="Tell us about yourself"
            className="font-normal px-6 py-2 outline-none border-none rounded-xl"
            {...register("bio")}
          ></textarea>
        </label>
        <button className="flex items-center justify-center bg-black text-white gap-4 text-lg px-10 py-2 font-semibold relative">
          {loading ? (
            <Loading color="#fff" type="spin" width={15} />
          ) : (
            "Register"
          )}
        </button>
        <p className="text-center">
          Have Account already?{" "}
          <Link to="/register" className="font-bold font-serif text-lg">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
