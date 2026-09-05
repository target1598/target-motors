import { Link } from "@tanstack/react-router";
import { carImage, type Car } from "@/lib/cars";
import { cardFit } from "@/lib/visualizer";
import { useLanguage } from "@/lib/language";

export function CarRail({ cars }: { cars: Car[] }) {
  const { lang } = useLanguage();
  return (
    <div className="rail-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 py-8 sm:gap-5 sm:px-8">
      {cars.map((car) => (
        <Link
          key={car.slug}
          to={car.brand === "toyota" ? "/toyota/$slug" : "/honda/$slug"}
          params={{ slug: car.slug }}
          className="group w-[78vw] max-w-md shrink-0 snap-center sm:w-[42vw] lg:w-[30vw]"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-transparent">
            <img
              src={carImage(car)}
              alt={car.name[lang]}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ width: `${cardFit(car.slug) * 100}%`, height: `${cardFit(car.slug) * 100}%` }}
              onError={(e) => {
                e.currentTarget.src = `${import.meta.env.BASE_URL}cars/fallback.svg`;
              }}
            />
          </div>
          <p className="mt-3 font-wordmark text-lg tracking-[0.08em] text-chrome-fg">
            {car.name.en.replace("Toyota ", "").replace("Honda ", "")}
          </p>
          <p className="text-sm text-chrome-muted">{car.name[lang]}</p>
        </Link>
      ))}
    </div>
  );
}