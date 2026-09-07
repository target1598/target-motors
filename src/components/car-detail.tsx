import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { CamryShowroom } from "@/components/camry-showroom";
import { CarSpin } from "@/components/car-spin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BODY_LABEL,
  BRAND_LABEL,
  colorsForTrim,
  interiorsForTrim,
  type Car,
  type Interior,
  type Paint,
  type TrimLevel,
} from "@/lib/cars";
import { whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";
import { catalogSrc, colorHasVisual, hasInterior, hasTrimSpin, hasTrimStill, interiorSrc, isFolderSpin, paintHasSpin, trimStillSrc } from "@/lib/visualizer";

export function CarDetail({ car }: { car: Car }) {
  if (car.slug === "camry") return <CamryShowroom car={car} />;
  return <ClassicCarDetail car={car} />;
}

function ClassicCarDetail({ car }: { car: Car }) {
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
  const interior: Interior = availableInteriors.find((item) => item.id === interiorId) ?? availableInteriors[0] ?? car.interiors[0];

  function onTrim(next: string) {
    setTrimId(next);
    const nextColors = colorsForTrim(car, next).filter((item) => colorHasVisual(car.slug, next, item.id));
    if (!nextColors.some((item) => item.id === colorId)) {
      setColorId(nextColors[0]?.id ?? car.defaultColor);
    }
    const nextInteriors = interiorsForTrim(car, next).filter((item) => hasInterior(car.slug, item.id));
    if (!nextInteriors.some((item) => item.id === interiorId)) {
      setInteriorId(nextInteriors[0]?.id ?? car.defaultInterior);
    }
  }

  const spin =
    hasTrimSpin(car.slug, trim.id, color.id) ||
    (!isFolderSpin(car.slug) && paintHasSpin(car.slug, color.id) && !hasTrimStill(car.slug, trim.id, color.id));
  const exteriorStill = hasTrimSpin(car.slug, trim.id, color.id)
    ? null
    : hasTrimStill(car.slug, trim.id, color.id)
      ? trimStillSrc(car.slug, trim.id, color.id)
      : catalogSrc(car.slug, color.id, trim.id) || null;
  const stillSrc =
    view === "interior" && interior
      ? interiorSrc(car.slug, interior.id, 1)
      : !spin
        ? exteriorStill
        : null;

  const specs = trim?.specs?.length ? trim.specs : car.specs;
  const highlights = trim?.highlights?.length ? trim.highlights : car.highlights;
  const hybrid = trim?.hybrid ?? car.hybrid;
  const plugin = trim?.plugin ?? car.plugin;
  const seats = trim?.seats ?? car.seats;
  const wa = whatsappHref(
    lang === "he"
      ? `שלום, אשמח לקבל הצעת מחיר ל${car.name.he} ${trim.name.he} בצבע ${color.name.he} עם פנים ${interior?.name.he ?? ""}`
      : `Hi, I would like a quote for the ${car.year} ${car.name.en} ${trim.name.en} in ${color.name.en} with ${interior?.name.en ?? ""} interior`,
  );

  return (
    <article>
      <div className="relative bg-studio text-studio-fg">
        <Link
          to={car.brand === "toyota" ? "/toyota" : "/honda"}
          className="absolute start-5 top-4 z-20 inline-flex w-fit items-center gap-2 text-sm text-studio-fg/70 hover:text-studio-fg sm:start-8 sm:top-6"
        >
          <Back className="size-4" />
          {t.car.back}
        </Link>
        <CarSpin
          slug={car.slug}
          paintId={color.id}
          trimId={trim.id}
          alt={
            view === "interior"
              ? `${car.name[lang]} — ${interior?.name[lang] ?? ""}`
              : `${car.name[lang]} — ${color.name[lang]}`
          }
          mode={view}
          interiorId={interior?.id}
          stillSrc={stillSrc}
        />
      </div>

      <div className="border-b border-rule bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="flex flex-wrap gap-2">
            <Badge>{car.year}</Badge>
            <Badge>{BRAND_LABEL[car.brand][lang]}</Badge>
            {plugin ? <Badge>{t.car.plugin}</Badge> : hybrid ? <Badge>Hybrid</Badge> : null}
            <Badge>{t.car.fromUs}</Badge>
            <Badge>
              {BODY_LABEL[car.body][lang]} · {seats}
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">{car.name[lang]}</h1>
          <p className="mt-2 text-lg text-quiet">
            {trim.name[lang]} · {color.name[lang]}
            {interior ? ` · ${interior.name[lang]}` : ""}
          </p>

          {availableInteriors.length > 0 ? (
            <div className="mt-8 flex gap-2">
              <button
                type="button"
                onClick={() => setView("exterior")}
                className={`rounded-full border px-4 py-2 text-sm ${
                  view === "exterior" ? "border-brand bg-brand text-accent-foreground" : "border-rule bg-mist text-ink"
                }`}
              >
                {t.car.exterior}
              </button>
              <button
                type="button"
                onClick={() => setView("interior")}
                className={`rounded-full border px-4 py-2 text-sm ${
                  view === "interior" ? "border-brand bg-brand text-accent-foreground" : "border-rule bg-mist text-ink"
                }`}
              >
                {t.car.interior}
              </button>
            </div>
          ) : null}

          {visibleTrims.length > 1 ? (
            <div className="mt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-quiet">{t.car.trim}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {visibleTrims.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTrim(item.id)}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm ${
                      item.id === trim.id ? "border-brand bg-brand text-accent-foreground" : "border-rule bg-mist text-ink"
                    }`}
                  >
                    {item.name[lang]}
                  </button>
                ))}
              </div>
              <p className="mt-3 max-w-2xl text-sm text-quiet">{trim.blurb[lang]}</p>
            </div>
          ) : null}

          {view === "exterior" && availableColors.length > 0 ? (
            <div className="mt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-quiet">{t.car.color}</p>
              <div className="mt-3 flex flex-wrap items-start gap-3">
                {availableColors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setColorId(item.id)}
                    className="group flex w-16 flex-col items-center gap-2"
                    aria-label={item.name[lang]}
                    aria-pressed={item.id === color.id}
                  >
                    <span
                      className={`size-10 rounded-full border-2 ${item.id === color.id ? "border-ink" : "border-ink/15"}`}
                      style={{
                        background: item.id.endsWith("black-roof")
                          ? `linear-gradient(180deg, #1a1a1a 38%, ${item.hex} 38%)`
                          : item.id.endsWith("grey-roof")
                            ? `linear-gradient(180deg, #c9c9c6 38%, ${item.hex} 38%)`
                            : item.hex,
                      }}
                    />
                    <span className={`text-center text-[10px] leading-tight ${item.id === color.id ? "text-ink" : "text-quiet"}`}>
                      {item.name[lang]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {view === "interior" && availableInteriors.length > 0 ? (
            <div className="mt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-quiet">{t.car.interiorColor}</p>
              <div className="mt-3 flex flex-wrap items-start gap-3">
                {availableInteriors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInteriorId(item.id)}
                    className="group flex w-20 flex-col items-center gap-2"
                    aria-label={item.name[lang]}
                    aria-pressed={item.id === interior?.id}
                  >
                    <span
                      className={`size-10 rounded-full border-2 ${item.id === interior?.id ? "border-ink" : "border-ink/15"}`}
                      style={{ background: item.hex }}
                    />
                    <span className={`text-center text-[10px] leading-tight ${item.id === interior?.id ? "text-ink" : "text-quiet"}`}>
                      {item.name[lang]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-lg text-muted">{car.tagline[lang]}</p>
          <p className="mt-5 leading-relaxed text-fg">{car.description[lang]}</p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label.en} className="rounded-xl border border-rule bg-paper px-5 py-4 text-ink">
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-quiet">{spec.label[lang]}</dt>
                <dd className="mt-1 text-sm font-medium">{spec.value[lang]}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mt-10 text-2xl font-medium">{t.car.highlights}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {highlights.map((item) => (
              <li key={item.en} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {item[lang]}
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-xl border border-rule bg-paper p-6 text-ink">
          <h2 className="text-2xl font-medium">{t.car.quoteTitle}</h2>
          <p className="mt-2 mb-6 text-sm text-quiet">{t.car.quoteBody}</p>
          <div className="mb-6 flex flex-wrap gap-2">
            <Button asChild>
              <a href={wa} target="_blank" rel="noreferrer">
                {t.whatsapp}
              </a>
            </Button>
            <Button asChild variant="paper">
              <a href="tel:0778053655">{t.call}</a>
            </Button>
          </div>
          <LeadForm defaultModel={car.name[lang]} />
        </aside>
      </div>
    </article>
  );
}
