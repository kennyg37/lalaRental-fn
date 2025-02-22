import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Logo from "./logo";

export default function Footer() {
  const [search, setSearch] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (search === "") {
      toast.error("Please enter a search term");
      return;
    }
    console.log("searching for", search);
  }
  const footerLinks = [
    { title: "Help", items: ["FAQ", "Shipping", "Returns"] },
    { title: "Others", items: ["Contact", "About Us", "Privacy Policy"] },
    {
      title: "Contact",
      items: ["+250 785 258 296", "lararental@lala.com"],
    },
  ];
  return (
    <article className="bg-black text-white padd py-8">
      <section className="flex justify-between items-center border-b border-white pb-8">
        <p>
          Let's stay in touch! Sign up to our newsletter and get the best deals!
        </p>
        <form onSubmit={handleSearch} className="w-1/3 flex gap-4">
          <input
            type="email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter your email"
            className="py-1 px-8 w-full bg-gray-200 outline-none placeholder:font-light"
          />
          <button className="bg-primary px-8 py-2 w-fit whitespace-nowrap">
            Sign up
          </button>
        </form>
      </section>
      <section className="py-8 flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <Logo isWhite />
          <div className="flex gap-2">
            {["x", "facebook", "linkedin", "instagram"].map((icon, i) => (
              <button key={i}>
                <img
                  src={`/icons/${icon}.png`}
                  className="w-8 object-contain"
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-20">
          {footerLinks.map((link, id) => (
            <FooterList key={id} title={link.title} items={link.items} />
          ))}
        </div>
      </section>
    </article>
  );
}

function FooterList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <p className="font-bold text-lg mb-4">{title}</p>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map((item, id) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
