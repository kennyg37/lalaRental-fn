import { useForm } from "react-hook-form";
import { UserLogin } from "../models/user";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<UserLogin>();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: UserLogin) {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password");
      navigate("/login");
    }
  }

  return (
    <section className="flex flex-col gap-6 justify-center items-center py-12 padd">
      <h1 className="text-4xl font-bold font-serif">Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 md:w-2/3 sm:w-full bg-gray-100 py-16 px-12 flex flex-col gap-6"
      >
        <label className="w-full flex flex-col gap-2 font-semibold">
          Email
          <input
            type="email"
            {...register("email")}
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
        <button className="flex items-center justify-center bg-black text-white gap-4 text-lg px-10 py-2 font-semibold relative">
          Login
        </button>
        <p className="text-center">
          Don't have Account yet?{" "}
          <Link to="/register" className="font-bold font-serif text-lg">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
