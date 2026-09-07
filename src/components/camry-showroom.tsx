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
  const [progress, setProgress] = useState(0);
  const studioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const h = studioRef.current?.offsetHeight ?? window.innerHeight;
      const next = Math.min(1, Math.max(0, window.scrollY / Math.max(1, h * 0.9)));
      setProgress(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
  const stillSrc = view === "interior" && interior ? interiorSrc(car.slug, interior.id, 1) : !spin ? null : null;
  const specs = trim.specs?.length ? trim.specs : car.specs;
  const highlights = trim.highlights?.length ? trim.highlights : car.highlights;
  const wa = whatsappHref(
    lang === "he"
      ? `שלום, אשמח לקבל הצעת מחיר לקאמרי ${trim.name.he} בצבע ${color.name.he}`
      : `Hi, I would like a quote for the 2026 Camry ${trim.name.en} in ${color.name.en}`,
  );
  const facts = FACTS[lang];
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const blur = reduced ? 0 : progress * 22;
  const fade = progress;
  const lift = reduced ? 0 : progress * -36;
  const zoom = reduced ? 1 : 1 + progress * 0.05;

  return (
    <article className="bg-bg text-ink">
      <div ref={studioRef} className="sticky top-16 z-0 overflow-hidden bg-bg">
        <div
          className="will-change-[filter,transform,opacity] origin-top"
          style={{
            filter: `blur(${blur}px)`,
            opacity: 1 - fade * 0.72,
            transform: `translate3d(0, ${lift}px, 0) scale(${zoom})`,
          }}
        >
          <CarSpin
            slug={car.slug}
            paintId={color.id}
            trimId={trim.id}
            alt={`${car.name[lang]} — ${color.name[lang]}`}
            mode={view}
            interiorId={interior?.id}
            stillSrc={stillSrc}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgb(243 243 241 / ${fade * 0.12}) 0%, rgb(243 243 241 / ${fade * 0.5}) 48%, rgb(243 243 241 / ${fade * 0.95}) 100%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: `linear-gradient(to top, rgb(243 243 241 / ${0.2 + fade * 0.8}), transparent)`,
          }}
        />

        <Link
          to="/toyota"
          className="absolute start-5 top-4 z-20 inline-flex items-center gap-2 text-sm text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] transition-colors hover:text-white sm:start-8 sm:top-6"
          style={{ opacity: Math.max(0, 1 - fade * 1.3) }}
        >
          <Back className="size-4" />
          {t.car.back}
        </Link>
        <p
          className="pointer-events-none absolute inset-x-0 bottom-3 z-20 text-center text-[10px] uppercase tracking-[0.28em] text-ink/40"
          style={{ opacity: 1 - fade * 1.4 }}
        >
          {lang === "he" ? "גררו לסיבוב" : "Drag to turn"}
        </p>
      </div>

      <div className="relative z-10 bg-bg">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-4 sm:px-8 sm:pb-16">
          <Reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand">
              {car.year} · {lang === "he" ? "יבוא מקביל מארה״ב" : "US parallel import"}
            </p>
            <h1 className="mt-3 font-wordmark text-4xl text-ink sm:text-6xl">{car.name[lang]}</h1>
            <p className="mt-3 text-base text-quiet">
              {trim.name[lang]}
              <span className="mx-2 text-brand">/</span>
              {color.name[lang]}
              {interior ? (
                <>
                  <span className="mx-2 text-ink/15">/</span>
                  {interior.name[lang]}
                </>
              ) : null}
            </p>
          </Reveal>

          <Reveal delay={1} className="mt-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-quiet">{t.car.trim}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-b border-ink/10">
              {visibleTrims.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTrim(item.id)}
                  className={cn(
                    "relative pb-3 text-sm tracking-wide transition-colors duration-200",
                    item.id === trim.id ? "text-ink" : "text-quiet hover:text-ink",
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
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-quiet">{trim.blurb[lang]}</p>
          </Reveal>

          <Reveal delay={2} className="mt-12 rounded-none bg-paper px-5 py-8 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-quiet">{t.car.color}</p>
              {availableInteriors.length > 0 ? (
                <div className="flex gap-1 border border-ink/10 bg-mist p-1">
                  {(["exterior", "interior"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setView(mode)}
                      className={cn(
                        "px-4 py-1.5 text-xs tracking-wide transition-colors duration-200",
                        view === mode ? "bg-chrome text-chrome-fg" : "text-quiet hover:text-ink",
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
                          on ? "border-ink shadow-[0_0_0_2px_#e10600]" : "border-ink/15 group-hover:border-ink/40",
                        )}
                        style={{ background: swatchFill(item.id, item.hex) }}
                      />
                      <span className={cn("text-center text-[10px] leading-tight", on ? "text-ink" : "text-quiet")}>
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
                          on ? "border-ink shadow-[0_0_0_2px_#e10600]" : "border-ink/15",
                        )}
                        style={{ background: item.hex }}
                      />
                      <span className={cn("text-center text-[10px] leading-tight", on ? "text-ink" : "text-quiet")}>
                        {item.name[lang]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>

        <div className="border-y border-ink/10 bg-paper">
          <div className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact, i) => {
              const dark = i === 0;
              return (
                <Reveal
                  key={fact.k}
                  delay={(Math.min(i, 3) + 1) as 1 | 2 | 3 | 4}
                  className={cn(
                    "px-5 py-8 sm:px-8",
                    dark ? "bg-chrome text-chrome-fg" : "bg-paper text-ink",
                    !dark && "border-ink/10",
                    i > 0 && "border-t sm:border-t-0",
                    i % 2 === 1 && "sm:border-s",
                    i >= 2 && "lg:border-s",
                  )}
                >
                  <p className={cn("text-[11px] uppercase tracking-[0.22em]", dark ? "text-chrome-muted" : "text-quiet")}>
                    {fact.k}
                  </p>
                  <p className="mt-2 text-lg">{fact.v}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand">{t.car.fromUs}</p>
              <h2 className="mt-3 font-wordmark text-3xl text-ink sm:text-4xl">{car.tagline[lang]}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{car.description[lang]}</p>
            </Reveal>
            <Reveal delay={1} className="mt-10 grid gap-6 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label.en} className="border-t border-ink/10 pt-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-quiet">{spec.label[lang]}</dt>
                  <dd className="mt-1 text-ink">{spec.value[lang]}</dd>
                </div>
              ))}
            </Reveal>
            <Reveal delay={2} className="mt-12">
              <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-quiet">{t.car.highlights}</h3>
              <ul className="mt-5 space-y-3">
                {highlights.map((item) => (
                  <li key={item.en} className="flex gap-3 text-sm text-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <aside className="bg-chrome p-6 text-chrome-fg sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-chrome-muted">{t.car.quoteTitle}</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-white">{t.quote}</h2>
              <p className="mt-3 text-sm text-chrome-muted">{t.car.quoteBody}</p>
              <p className="mt-1 text-sm text-white/80">
                {trim.name[lang]} · {color.name[lang]}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild>
                  <a href={wa} target="_blank" rel="noreferrer">
                    {t.whatsapp}
                  </a>
                </Button>
                <Button asChild variant="chrome">
                  <a href="tel:0778053655">{t.call}</a>
                </Button>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6 [&_label]:text-chrome-muted [&_input]:border-white/15 [&_input]:bg-white [&_input]:text-ink [&_textarea]:border-white/15 [&_textarea]:bg-white [&_textarea]:text-ink">
                <LeadForm defaultModel={`${car.name[lang]} ${trim.name[lang]}`} />
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
