import { createFileRoute } from "@tanstack/react-router";
import { CarCard } from "@/components/car-card";
import { PageHero, Section } from "@/components/page-hero";
import { carsByBrand } from "@/lib/cars";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/honda/")({ component: HondaPage });

function HondaPage() {
  const { t } = useLanguage();
  const cars = carsByBrand("honda");
  return (
    <main>
      <PageHero kicker={t.nav.honda} title={t.hondaTitle} sub={t.hondaSub} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </Section>
    </main>
  );
}
