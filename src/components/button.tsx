interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "five";
  icon?: string;
  banner?: string;
}

export default function CustomButton({
  text,
  onClick,
  variant = "primary",
  icon,
  banner,
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 text-lg px-10 py-1 relative ${
        variant === "primary"
          ? "border border-black"
          : variant === "secondary"
          ? "border border-black rounded-3xl"
          : variant === "tertiary"
          ? "border border-white text-white"
          : variant === "five"
          ? "rounded-3xl bg-primary text-white"
          : "border-2 border-primary text-primary"
      }`}
    >
      <p className="whitespace-nowrap">{text}</p>
      {icon && (
        <img src={`/icons/${icon}.png`} className="w-6 object-contain" alt="" />
      )}
      {banner && (
        <div className="w-6 h-6 bg-primary text-black absolute -top-3 -right-3 rounded-full text-sm grid place-content-center">
          {banner}
        </div>
      )}
    </button>
  );
}
