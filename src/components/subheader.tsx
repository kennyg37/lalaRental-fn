import { NavLink } from "react-router-dom";
import { subHeaderElts } from "../constants/subHeaders";

export default function Subheader() {
  return (
    <section className="padd shadow-md">
      <nav className="flex justify-between items-center py-4">
        {subHeaderElts.map((subHeaderElt) => (
          <HeaderElement key={subHeaderElt.name} {...subHeaderElt} />
        ))}
      </nav>
    </section>
  );
}

interface HeaderElementProps {
  name: string;
  link: string;
  icon: string;
  isRed?: boolean;
  isAnchor?: boolean;
}

function HeaderElement({
  name,
  link,
  icon,
  isRed,
  isAnchor,
}: HeaderElementProps) {
  return isAnchor ? (
    <a href={link} className="flex items-center gap-5">
      <img src={`/icons/${icon}.png`} className="w-6 " alt="" />
      <p>{name}</p>
    </a>
  ) : (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex items-center gap-5  ${isRed ? "text-primary" : ""} ${
          isActive ? "font-semibold text-lg" : ""
        }`
      }
    >
      <img src={`/icons/${icon}.png`} className="w-6 " alt="" />
      <p>{name}</p>
    </NavLink>
  );
}
