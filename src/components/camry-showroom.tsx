import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Layers3, Palette, ShieldCheck, Sparkles } from "lucide-react";
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
import "./camry-showroom.css";
import { colorHasVisual, hasInterior, hasTrimSpin, interiorSrc } from "@/lib/visualizer";

type Motion = "rise" | "slide" | "scale";

function Reveal({ children, className, delay, motion = "rise" }: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  motion?: Motion;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "waiting" | "visible">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      if (preference.matches) {
        setState("visible");
        return;
      }
      const rect = el.getBoundingClientRect();
      setState(rect.top < window.innerHeight && rect.bottom > 0 ? "visible" : "waiting");
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setState("visible");
        // Re-arm only after the whole card leaves the viewport, in either direction.
        else if (entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top >= window.innerHeight) {
          setState("waiting");
        }
      }, { threshold: 0 });
      observer.observe(el);
    };
    observe();
    preference.addEventListener("change", observe);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", observe);
    };
  }, []);
  return (
    <div ref={ref} data-motion={motion} data-reveal={state}
      className={cn("camry-reveal", delay && `camry-delay-${delay}`, className)}>
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
      <div ref={studioRef} className="camry-studio-shell sticky top-16 z-0 overflow-hidden bg-bg">
        <div className="camry-studio-layout">
        <div className="camry-studio-image">
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

        <aside className="camry-design camry-studio-controls" aria-label={lang === "he" ? "התאמת הרכב באולם התצוגה" : "Configure your car in the showroom"}>
          <div className="camry-studio-trims">
            <div className="camry-studio-heading">
              <Layers3 size={18} aria-hidden="true" />
              <h2>{t.car.trim}</h2>
            </div>
            <div className="camry-trims" role="group" aria-label={t.car.trim}>
              {visibleTrims.map((item) => (
                <button key={item.id} type="button" onClick={() => onTrim(item.id)}
                  aria-pressed={item.id === trim.id} className="camry-trim">
                  <span>{item.name[lang]}</span>
                  <span className="camry-trim-check" aria-hidden="true"><Check size={15} /></span>
                </button>
              ))}
            </div>
          </div>

          <div className="camry-studio-paints">
            <div className="camry-studio-heading">
              <Palette size={18} aria-hidden="true" />
              <h2>{view === "exterior" ? t.car.color : t.car.interiorColor}</h2>
              {availableInteriors.length > 0 ? (
                <div className="camry-view-switch" role="group" aria-label={lang === "he" ? "תצוגת הרכב" : "Vehicle view"}>
                  {(["exterior", "interior"] as const).map((mode) => (
                    <button key={mode} type="button" onClick={() => setView(mode)} aria-pressed={view === mode}>
                      {mode === "exterior" ? t.car.exterior : t.car.interior}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <p className="camry-studio-paint-name" aria-live="polite">
              {view === "exterior" ? color.name[lang] : interior?.name[lang]}
            </p>
            <div className="camry-swatches" role="group" aria-label={view === "exterior" ? t.car.color : t.car.interiorColor}>
              {(view === "exterior" ? availableColors : availableInteriors).map((item) => (
                <button key={item.id} type="button"
                  onClick={() => view === "exterior" ? setColorId(item.id) : setInteriorId(item.id)}
                  aria-label={item.name[lang]}
                  aria-pressed={item.id === (view === "exterior" ? color.id : interior?.id)}
                  className="camry-paint">
                  <span className="camry-paint-chip"
                    style={{ background: view === "exterior" ? swatchFill(item.id, item.hex) : item.hex }} />
                  <span>{item.name[lang]}</span>
                  <Check className="camry-paint-check" size={14} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </aside>
        </div>
      </div>

      <div className="camry-design relative z-10">
        <section className="camry-scene camry-config" aria-labelledby="camry-title">
          <div className="camry-shell">
            <Reveal className="camry-intro">
              <div>
                <p className="camry-eyebrow"><span className="camry-line" />{car.year} · {t.car.fromUs}</p>
                <h1 id="camry-title">{car.name[lang]}</h1>
                <p className="camry-selection">
                  <span>{trim.name[lang]}</span><span>{color.name[lang]}</span>
                  {interior ? <span>{interior.name[lang]}</span> : null}
                </p>
              </div>
              <a href="#camry-configuration" className="camry-explore">
                {lang === "he" ? "הקאמרי שלכם" : "Your Camry"}<ChevronDown size={18} />
              </a>
            </Reveal>

            <div id="camry-configuration" className="camry-config-grid">
              <Reveal motion="slide" className="camry-panel camry-trim-panel">
                <div className="camry-panel-heading">
                  <span className="camry-icon"><Layers3 size={22} strokeWidth={1.5} /></span>
                  <div><p className="camry-eyebrow">01 / {lang === "he" ? "הבחירה שלכם" : "Make it yours"}</p>
                    <h2>{t.car.trim}</h2></div>
                </div>
                <div className="camry-trims" role="group" aria-label={t.car.trim}>
                  {visibleTrims.map((item) => (
                    <button key={item.id} type="button" onClick={() => onTrim(item.id)}
                      aria-pressed={item.id === trim.id} className="camry-trim">
                      <span>{item.name[lang]}</span>
                      <span className="camry-trim-check" aria-hidden="true"><Check size={15} /></span>
                    </button>
                  ))}
                </div>
                <p key={trim.id} className="camry-detail-swap camry-trim-description">{trim.blurb[lang]}</p>
              </Reveal>

              <Reveal motion="scale" delay={1} className="camry-panel camry-paint-panel">
                <div className="camry-panel-heading">
                  <span className="camry-icon"><Palette size={22} strokeWidth={1.5} /></span>
                  <div><p className="camry-eyebrow">{lang === "he" ? "הגוון שלכם" : "Your finish"}</p>
                    <h2>{view === "exterior" ? t.car.color : t.car.interiorColor}</h2></div>
                  {availableInteriors.length > 0 ? (
                    <div className="camry-view-switch" role="group" aria-label={lang === "he" ? "תצוגת הרכב" : "Vehicle view"}>
                      {(["exterior", "interior"] as const).map((mode) => (
                        <button key={mode} type="button" onClick={() => setView(mode)} aria-pressed={view === mode}>
                          {mode === "exterior" ? t.car.exterior : t.car.interior}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <p className="camry-paint-name" aria-live="polite">
                  {view === "exterior" ? color.name[lang] : interior?.name[lang]}
                </p>
                {view === "exterior" ? (
                  <div className="camry-swatches" role="group" aria-label={t.car.color}>
                    {availableColors.map((item) => {
                      const on = item.id === color.id;
                      return (
                        <button key={item.id} type="button" onClick={() => setColorId(item.id)}
                          aria-label={item.name[lang]} aria-pressed={on} className="camry-paint">
                          <span className="camry-paint-chip" style={{ background: swatchFill(item.id, item.hex) }} />
                          <span>{item.name[lang]}</span>
                          <Check className="camry-paint-check" size={14} aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="camry-swatches" role="group" aria-label={t.car.interiorColor}>
                    {availableInteriors.map((item) => {
                      const on = item.id === interior?.id;
                      return (
                        <button key={item.id} type="button" onClick={() => setInteriorId(item.id)}
                          aria-label={item.name[lang]} aria-pressed={on} className="camry-paint">
                          <span className="camry-paint-chip" style={{ background: item.hex }} />
                          <span>{item.name[lang]}</span>
                          <Check className="camry-paint-check" size={14} aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        <section className="camry-scene camry-overview" aria-labelledby="camry-overview-title">
          <div className="camry-shell">
            <Reveal className="camry-section-heading">
              <div><p className="camry-eyebrow">02 / {lang === "he" ? "מבט מקרוב" : "A closer look"}</p>
                <h2 id="camry-overview-title">{lang === "he" ? "הפרטים שעושים את ההבדל" : "Details that make the difference"}</h2></div>
              <span className="camry-outline-word" aria-hidden="true">CAMRY</span>
            </Reveal>
            <div className="camry-facts">
              {facts.map((fact, i) => (
                <Reveal key={fact.k} motion="scale" delay={(i % 3 + 1) as 1 | 2 | 3} className="camry-fact">
                  <span className="camry-fact-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p>{fact.k}</p><h3>{fact.v}</h3>
                  <span className="camry-fact-line" aria-hidden="true" />
                </Reveal>
              ))}
            </div>

            <div className="camry-story-grid">
              <Reveal motion="slide" className="camry-story">
                <p className="camry-eyebrow"><span className="camry-line" />{t.car.fromUs}</p>
                <h2>{car.tagline[lang]}</h2>
                <p className="camry-body">{car.description[lang]}</p>
                <div className="camry-keywords">
                  <span><Sparkles size={16} />{car.year}</span>
                  <span><Layers3 size={16} />{trim.name[lang]}</span>
                  <span><ShieldCheck size={16} />Toyota Safety Sense 3.0</span>
                </div>
              </Reveal>
              <Reveal motion="rise" delay={1} className="camry-panel camry-spec-panel">
                <div className="camry-panel-heading">
                  <span className="camry-icon"><Layers3 size={22} strokeWidth={1.5} /></span>
                  <div><p className="camry-eyebrow">{trim.name[lang]}</p>
                    <h3>{lang === "he" ? "המפרט במבט אחד" : "Specifications at a glance"}</h3></div>
                </div>
                <dl className="camry-specs">
                  {specs.map((spec) => (
                    <div key={spec.label.en}>
                      <dt>{spec.label[lang]}</dt><dd>{spec.value[lang]}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal className="camry-section-heading camry-highlights-heading">
              <div><p className="camry-eyebrow">{trim.name[lang]}</p><h2>{t.car.highlights}</h2></div>
            </Reveal>
            <ul className="camry-highlights">
              {highlights.map((item, i) => (
                <li key={item.en}>
                  <Reveal motion={i % 2 === 0 ? "rise" : "scale"} delay={(i % 3 + 1) as 1 | 2 | 3} className="camry-highlight">
                    <span className="camry-highlight-icon"><Check size={20} strokeWidth={1.7} /></span>
                    <span>{item[lang]}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="camry-scene camry-contact" aria-labelledby="camry-quote-title">
          <div className="camry-shell camry-contact-grid">
            <Reveal motion="slide" className="camry-contact-story">
              <p className="camry-eyebrow">03 / {t.car.quoteTitle}</p>
              <h2 id="camry-quote-title">{t.quote}<span className="camry-title-dot">.</span></h2>
              <p className="camry-body">{t.car.quoteBody}</p>
              <div className="camry-summary">
                <p className="camry-eyebrow">{car.name[lang]}</p>
                <p>{trim.name[lang]}</p>
                <div className="camry-summary-paint">
                  <span style={{ background: swatchFill(color.id, color.hex) }} />
                  {color.name[lang]}
                </div>
                {interior ? <p className="camry-summary-interior">{t.car.interior}: {interior.name[lang]}</p> : null}
              </div>
              <div className="camry-contact-actions">
                <Button asChild><a href={wa} target="_blank" rel="noreferrer">{t.whatsapp}<Back size={16} /></a></Button>
                <Button asChild variant="paper"><a href="tel:0778053655">{t.call}</a></Button>
              </div>
            </Reveal>
            <Reveal motion="scale" delay={1} className="camry-panel camry-form-panel">
              <aside>
                <h3>{t.car.quoteTitle}</h3>
                <div className="camry-form">
                  <LeadForm defaultModel={`${car.name[lang]} ${trim.name[lang]}`} />
                </div>
              </aside>
            </Reveal>
          </div>
        </section>
      </div>
    </article>
  );
}
