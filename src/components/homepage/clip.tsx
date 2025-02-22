export default function Clip() {
  return (
    <article className="w-full padd h-[60vh] relative py-12">
      <svg height="100%" width="100%" viewBox="0 0 100 40">
        <clipPath id="border">
          <path
            d="
        M 7 5
        L 85 5
        A 2.5 2.5 0 0 0 87.5 2.5
        A 2.5 2.5 0 0 1 90 0
        L 97.5 0
        A 2.5 2.5 0 0 1 100 2.5
        L 100 25
        A 2.5 2.5 0 0 1 97.5 27.5
        L 80 27.5
        A 2.5 2.5 0 0 0 77.5 30
        L 77.5 35
        A 2.5 2.5 0 0 1 75 37.5
        L 10 37.5
        A 2.5 2.5 0 0 1 7.5 35
        L 7.5 20
        A 2.5 2.5 0 0 0 5 17.5
        L 2.5 17.5
        A 2.5 2.5 0 0 1 0 15
        L 0 7.5
        A 2.5 2.5 0 0 1 2.5 5
      "
          ></path>
        </clipPath>
        <image
          xlinkHref="/one.jpg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clip-path="url(#border)"
        />
      </svg>

      <div className="absolute bottom-10 right-[9%] h-[23%] w-[18%] rounded-[35px] grid place-content-center font-bold font-serif text-4xl">
        Lararental
      </div>
    </article>
  );
}
