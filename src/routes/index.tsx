import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shield, BadgeCheck, Wallet } from "lucide-react";
import { CarCard } from "@/components/car-card";
import { CarRail } from "@/components/car-rail";
import { LeadForm } from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { carsByBrand, carImage, featuredCars } from "@/lib/cars";
import { COMPANY } from "@/lib/company";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({ component: Home });

const ICONS = [Shield, BadgeCheck, Wallet];

function Home() {
  const { t, dir, lang } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const featured = featuredCars();
  const toyota = carsByBrand("toyota");
  const toyotaHero = toyota[0];
  const hondaHero = carsByBrand("honda")[0];

  return (
    <main>
      <section className="relative isolate min-h-[calc(100dvh-4.25rem)] overflow-hidden bg-chrome text-chrome-fg">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[18%] select-none text-center font-wordmark text-[16vw] leading-[0.85] text-chrome-fg/15 sm:top-[14%] sm:text-[12vw]"
        >
          TARGET
          <br />
          MOTORS
        </p>
        <img
          src={toyotaHero ? carImage(toyotaHero) : "/cars/fallback.svg"}
          alt=""
          className="absolute inset-0 size-full object-contain object-[center_58%] scale-[1.18] pt-6 sm:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chrome via-chrome/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[calc(100dvh-4.25rem)] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 sm:pb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand">{t.heroKicker}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-base text-chrome-muted sm:text-lg">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#arrivals">
                {t.heroCta}
                <Arrow className="size-4" />
              </a>
            </Button>
            <Button asChild variant="chrome" size="lg">
              <Link to="/toyota">{t.heroSecondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-chrome text-chrome-fg">
        <div className="mx-auto flex max-w-6xl items-end justify-between px-5 pt-10 sm:px-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">Toyota · Honda</p>
            <h2 className="mt-2 text-2xl font-medium sm:text-3xl">{t.featured}</h2>
          </div>
        </div>
        <CarRail cars={featured} />
      </section>

      <section id="arrivals" className="scroll-mt-24 bg-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-medium">{t.featured}</h2>
              <p className="mt-3 max-w-2xl text-muted">{t.featuredSub}</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/toyota">{t.nav.toyota}</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toyota.slice(0, 6).map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-chrome text-chrome-fg md:grid-cols-2">
        <Link to="/toyota" className="group relative isolate min-h-72 overflow-hidden border-b border-chrome-fg/10 md:border-e md:border-b-0">
          {toyotaHero ? (
            <img
              src={carImage(toyotaHero)}
              alt=""
              className="absolute inset-0 size-full object-contain opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-chrome via-chrome/40 to-transparent" />
          <div className="relative flex h-full min-h-72 flex-col justify-end p-8 sm:p-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand">2026</p>
            <h2 className="font-wordmark text-4xl tracking-[0.12em] sm:text-5xl">Toyota</h2>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-chrome-muted">
              {t.nav.toyota}
              <Arrow className="size-4" />
            </p>
          </div>
        </Link>
        <Link to="/honda" className="group relative isolate min-h-72 overflow-hidden">
          {hondaHero ? (
            <img
              src={carImage(hondaHero)}
              alt=""
              className="absolute inset-0 size-full object-contain opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-chrome via-chrome/40 to-transparent" />
          <div className="relative flex h-full min-h-72 flex-col justify-end p-8 sm:p-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-brand">US spec</p>
            <h2 className="font-wordmark text-4xl tracking-[0.12em] sm:text-5xl">Honda</h2>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-chrome-muted">
              {t.nav.honda}
              <Arrow className="size-4" />
            </p>
          </div>
        </Link>
      </section>

      <section className="border-y border-border bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-rule sm:grid-cols-4">
          {t.trust.map((item) => (
            <div key={item.n} className="bg-paper px-5 py-8 sm:px-8">
              <p className="text-2xl font-medium">{item.n}</p>
              <p className="mt-1 text-sm text-quiet">{item.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-3xl font-medium">{t.servicesTitle}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.services.map((item, i) => {
              const Icon = ICONS[i] ?? Shield;
              return (
                <div key={item.t} className="rounded-xl border border-rule bg-paper p-6">
                  <Icon className="size-5 text-brand" />
                  <h3 className="mt-4 text-xl font-medium">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-quiet">{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">{t.angloKicker}</p>
          <h2 className="mt-3 text-3xl font-medium">{t.angloTitle}</h2>
          <p className="mt-4 text-muted">{t.angloBody}</p>
        </div>
        <div className="rounded-xl border border-rule bg-paper p-8 text-ink">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-quiet">{t.showroom}</p>
          <p className="mt-2 text-2xl">{lang === "he" ? COMPANY.addressHe : COMPANY.addressEn}</p>
          <p className="mt-2 text-sm text-quiet">{lang === "he" ? COMPANY.hoursHe : COMPANY.hoursEn}</p>
          <a href={COMPANY.phoneTel} className="mt-4 inline-block text-brand">
            {COMPANY.phoneDisplay}
          </a>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-3xl font-medium">{t.stepsTitle}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {t.steps.map((step, i) => (
              <li key={step.t}>
                <p className="font-wordmark text-4xl text-brand">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-medium">{step.t}</h3>
                <p className="mt-1 text-sm text-quiet">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-medium">{t.ctaBand}</h2>
          <p className="mt-3 text-muted">{t.ctaBandBody}</p>
          <p className="mt-6 text-sm text-muted">{lang === "he" ? COMPANY.addressHe : COMPANY.addressEn}</p>
          <p className="text-sm text-muted">{COMPANY.phoneDisplay}</p>
        </div>
        <div className="rounded-xl border border-rule bg-paper p-6 text-ink sm:p-8">
          <h3 className="text-xl font-medium">{t.formTitle}</h3>
          <div className="mt-5">
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}
