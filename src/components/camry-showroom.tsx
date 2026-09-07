import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { CarSpin } from "@/components/car-spin";
import { Button } from "@/components/ui/button";
import {
  colorsForTrim,
  interiorsForTrim,
  type Car,
  type Interior,
  type Paint,
  type TrimLevel,
} from "@/lib/cars";
import { whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { colorHasVisual, hasInterior, hasTrimSpin, interiorSrc } from "@/lib/visualizer";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => setOn(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.94) show();
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

function Reveal({ children, className, delay }: { children: ReactNode; className?: string; delay?: 1 | 2 | 3 | 4 }) {
  const { ref, on } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", on && "is-in", delay ? `reveal-delay-${delay}` : null, className)}
    >
      {children}
    </div>
  );
}

function swatchFill(id: string, hex: string) {
  if (id.endsWith("black-roof")) return `linear-gradient(180deg, #1a1a1a 38%, ${hex} 38%)`;
  if (id.endsWith("grey-roof")) return `linear-gradient(180deg, #c9c9c6 38%, ${hex} 38%)`;
  return hex;
}

const FACTS = {
  he: [
    { k: "יבוא", v: "מקביל מארה״ב" },
    { k: "שנת דגם", v: "2026" },
    { k: "מרכב", v: "סדאן 5 דלתות" },
    { k: "מקומות", v: "חמישה" },
    { k: "מערכת בטיחות", v: "Toyota Safety Sense 3.0" },
    { k: "מסך", v: "עד 12.3״" },
  ],
  en: [
    { k: "Import", v: "US parallel import" },
    { k: "Model year", v: "2026" },
    { k: "Body", v: "5-door sedan" },
    { k: "Seats", v: "Five" },
    { k: "Safety", v: "Toyota Safety Sense 3.0" },
    { k: "Screen", v: "Up to 12.3\"" },
  ],
};

export function CamryShowroom({ car }: { car: Car }) {
  const { lang, t, dir } = useLanguage();
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;
  const [trimId, setTrimId] = useState(car.defaultTrim);
  const [colorId, setColorId] = useState(car.defaultColor);
  const [interiorId, setInteriorId] = useState(car.defaultInterior);
  const [view, setView] = useState<"exterior" | "interior">("exterior");

  const trim: TrimLevel = car.trims.find((item) => item.id === trimId) ?? car.trims[0];
  const availableColors = useMemo(
    () => colorsForTrim(car, trim.id).filter((item) => colorHasVisual(car.slug, trim.id, item.id)),
    [car, trim.id],
  );
  const visibleTrims = useMemo(
    () => car.trims.filter((item) => colorsForTrim(car, item.id).some((c) => colorHasVisual(car.slug, item.id, c.id))),
    [car],
  );
  const availableInteriors = useMemo(
    () => interiorsForTrim(car, trim.id).filter((item) => hasInterior(car.slug, item.id)),
    [car, trim.id],
  );
  const color: Paint = availableColors.find((item) => item.id === colorId) ?? availableColors[0] ?? car.colors[0];
  const interior: Interior =
    availableInteriors.find((item) => item.id === interiorId) ?? availableInteriors[0] ?? car.interiors[0];

  function onTrim(next: string) {
    setTrimId(next);
    const nextColors = colorsForTrim(car, next).filter((item) => colorHasVisual(car.slug, next, item.id));
    if (!nextColors.some((item) => item.id === colorId)) setColorId(nextColors[0]?.id ?? car.defaultColor);
    const nextInteriors = interiorsForTrim(car, next).filter((item) => hasInterior(car.slug, item.id));
    if (!nextInteriors.some((item) => item.id === interiorId)) setInteriorId(nextInteriors[0]?.id ?? car.defaultInterior);
  }

  const spin = hasTrimSpin(car.slug, trim.id, color.id);
  const stillSrc =
    view === "interior" && interior ? interiorSrc(car.slug, interior.id, 1) : !spin ? null : null;
  const specs = trim.specs?.length ? trim.specs : car.specs;
  const highlights = trim.highlights?.length ? trim.highlights : car.highlights;
  const wa = whatsappHref(
    lang === "he"
      ? `שלום, אשמח לקבל הצעת מחיר לקאמרי ${trim.name.he} בצבע ${color.name.he}`
      : `Hi, I would like a quote for the 2026 Camry ${trim.name.en} in ${color.name.en}`,
  );
  const facts = FACTS[lang];

  return (
    <article className="bg-chrome text-chrome-fg">
      <div className="sticky top-16 z-0 bg-black">
        <CarSpin
          slug={car.slug}
          paintId={color.id}
          trimId={trim.id}
          alt={`${car.name[lang]} — ${color.name[lang]}`}
          mode={view}
          interiorId={interior?.id}
          stillSrc={stillSrc}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-chrome to-transparent" />

        <Link
          to="/toyota"
          className="absolute start-5 top-4 z-20 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white sm:start-8 sm:top-6"
        >
          <Back className="size-4" />
          {t.car.back}
        </Link>
        <p className="pointer-events-none absolute inset-x-0 bottom-3 z-20 text-center text-[10px] uppercase tracking-[0.28em] text-white/40">
          {lang === "he" ? "גררו לסיבוב" : "Drag to turn"}
        </p>
      </div>

      <div className="relative z-10 bg-chrome">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand">
              {car.year} · {lang === "he" ? "יבוא מקביל מארה״ב" : "US parallel import"}
            </p>
            <h1 className="mt-3 font-wordmark text-4xl text-white sm:text-6xl">{car.name[lang]}</h1>
            <p className="mt-3 text-base text-chrome-muted">
              {trim.name[lang]}
              <span className="mx-2 text-brand">/</span>
              {color.name[lang]}
              {interior ? (
                <>
                  <span className="mx-2 text-white/20">/</span>
                  {interior.name[lang]}
                </>
              ) : null}
            </p>
          </Reveal>

          <Reveal delay={1} className="mt-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-chrome-muted">{t.car.trim}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10">
              {visibleTrims.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTrim(item.id)}
                  className={cn(
                    "relative pb-3 text-sm tracking-wide transition-colors duration-200",
                    item.id === trim.id ? "text-white" : "text-chrome-muted hover:text-white",
                  )}
                >
                  {item.name[lang]}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px bg-brand transition-opacity duration-200",
                      item.id === trim.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-chrome-muted">{trim.blurb[lang]}</p>
          </Reveal>

          <Reveal delay={1} className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-chrome-muted">{t.car.color}</p>
              {availableInteriors.length > 0 ? (
                <div className="flex gap-1 rounded-full border border-white/10 p-1">
                  {(["exterior", "interior"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setView(mode)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-xs tracking-wide transition-colors duration-200",
                        view === mode ? "bg-white text-ink" : "text-chrome-muted hover:text-white",
                      )}
                    >
                      {mode === "exterior" ? t.car.exterior : t.car.interior}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {view === "exterior" ? (
              <div className="mt-6 flex flex-wrap gap-5">
                {availableColors.map((item) => {
                  const on = item.id === color.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setColorId(item.id)}
                      aria-label={item.name[lang]}
                      aria-pressed={on}
                      className="group flex w-[4.5rem] flex-col items-center gap-2"
                    >
                      <span
                        className={cn(
                          "size-11 rounded-full border transition-[box-shadow,transform] duration-200",
                          on ? "border-white scale-100 shadow-[0_0_0_2px_#e10600]" : "border-white/20 group-hover:border-white/60",
                        )}
                        style={{ background: swatchFill(item.id, item.hex) }}
                      />
                      <span className={cn("text-center text-[10px] leading-tight", on ? "text-white" : "text-chrome-muted")}>
                        {item.name[lang]}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap gap-5">
                {availableInteriors.map((item) => {
                  const on = item.id === interior?.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setInteriorId(item.id)}
                      aria-label={item.name[lang]}
                      aria-pressed={on}
                      className="group flex w-20 flex-col items-center gap-2"
                    >
                      <span
                        className={cn(
                          "size-11 rounded-full border transition-[box-shadow] duration-200",
                          on ? "border-white shadow-[0_0_0_2px_#e10600]" : "border-white/20",
                        )}
                        style={{ background: item.hex }}
                      />
                      <span className={cn("text-center text-[10px] leading-tight", on ? "text-white" : "text-chrome-muted")}>
                        {item.name[lang]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>

        <div className="border-y border-white/10">
          <div className="mx-auto grid max-w-6xl gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact, i) => (
              <Reveal key={fact.k} delay={(Math.min(i, 3) + 1) as 1 | 2 | 3 | 4} className="bg-chrome px-5 py-8 sm:px-8">
                <p className="text-[11px] uppercase tracking-[0.22em] text-chrome-muted">{fact.k}</p>
                <p className="mt-2 text-lg text-white">{fact.v}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand">{t.car.fromUs}</p>
              <h2 className="mt-3 font-wordmark text-3xl text-white sm:text-4xl">{car.tagline[lang]}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-chrome-muted">{car.description[lang]}</p>
            </Reveal>
            <Reveal delay={1} className="mt-10 grid gap-6 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label.en} className="border-t border-white/10 pt-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-chrome-muted">{spec.label[lang]}</dt>
                  <dd className="mt-1 text-white">{spec.value[lang]}</dd>
                </div>
              ))}
            </Reveal>
            <Reveal delay={2} className="mt-12">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-chrome-muted">{t.car.highlights}</h3>
              <ul className="mt-5 space-y-3">
                {highlights.map((item) => (
                  <li key={item.en} className="flex gap-3 text-sm text-chrome-fg/85">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <aside className="bg-paper p-6 text-ink sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-quiet">{t.car.quoteTitle}</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight">{t.quote}</h2>
              <p className="mt-3 text-sm text-quiet">
                {t.car.quoteBody}
              </p>
              <p className="mt-1 text-sm text-ink">
                {trim.name[lang]} · {color.name[lang]}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild>
                  <a href={wa} target="_blank" rel="noreferrer">
                    {t.whatsapp}
                  </a>
                </Button>
                <Button asChild variant="paper">
                  <a href="tel:0778053655">{t.call}</a>
                </Button>
              </div>
              <div className="mt-8 border-t border-rule pt-6">
                <LeadForm defaultModel={`${car.name[lang]} ${trim.name[lang]}`} />
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
