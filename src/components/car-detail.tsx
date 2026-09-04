import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { CarSpin } from "@/components/car-spin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BODY_LABEL, BRAND_LABEL, colorsForTrim, type Car, type Paint, type TrimLevel } from "@/lib/cars";
import { whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";

export function CarDetail({ car }: { car: Car }) {
  const { lang, t, dir } = useLanguage();
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;
  const [trimId, setTrimId] = useState(car.defaultTrim);
  const [colorId, setColorId] = useState(car.defaultColor);

  const trim: TrimLevel = car.trims.find((item) => item.id === trimId) ?? car.trims[0];
  const availableColors = useMemo(() => colorsForTrim(car, trim.id), [car, trim.id]);
  const color: Paint = availableColors.find((item) => item.id === colorId) ?? availableColors[0];

  function onTrim(next: string) {
    setTrimId(next);
    const nextColors = colorsForTrim(car, next);
    if (!nextColors.some((item) => item.id === colorId)) {
      setColorId(nextColors[0]?.id ?? car.defaultColor);
    }
  }

  const specs = trim?.specs?.length ? trim.specs : car.specs;
  const highlights = trim?.highlights?.length ? trim.highlights : car.highlights;
  const hybrid = trim?.hybrid ?? car.hybrid;
  const plugin = trim?.plugin ?? car.plugin;
  const seats = trim?.seats ?? car.seats;
  const wa = whatsappHref(
    lang === "he"
      ? `שלום, אשמח לקבל הצעת מחיר ל${car.name.he} ${trim.name.he} בצבע ${color.name.he}`
      : `Hi, I would like a quote for the ${car.year} ${car.name.en} ${trim.name.en} in ${color.name.en}`,
  );

  return (
    <article>
      <div className="relative bg-studio text-studio-fg">
        <div className="relative mx-auto max-w-6xl px-5 pt-4 sm:px-8 sm:pt-6">
          <Link
            to={car.brand === "toyota" ? "/toyota" : "/honda"}
            className="inline-flex w-fit items-center gap-2 text-sm text-studio-fg/70 hover:text-studio-fg"
          >
            <Back className="size-4" />
            {t.car.back}
          </Link>
          <CarSpin slug={car.slug} paintId={color.id} alt={`${car.name[lang]} — ${color.name[lang]}`} />
        </div>
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
          </p>

          {car.trims.length > 1 ? (
            <div className="mt-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-quiet">{t.car.trim}</p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {car.trims.map((item) => (
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

          {availableColors.length > 1 ? (
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
                      style={{ background: item.hex }}
                    />
                    <span className={`text-center text-[10px] leading-tight ${item.id === color.id ? "text-ink" : "text-quiet"}`}>
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
