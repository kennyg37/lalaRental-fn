import { useNavigate } from "react-router";

export default function Logo({ isWhite = false }: { isWhite?: boolean }) {
  const navigate = useNavigate();
  return (
    <article
      className="cursor-pointer flex items-center gap-4"
      onClick={() => navigate("/")}
    >
      <img
        src={isWhite ? "/logow.png" : "/logo.png"}
        className="w-10 object-contain"
        alt=""
      />
      <h1 className="font-bold font-serif text-2xl">Lararental</h1>
    </article>
  );
}
