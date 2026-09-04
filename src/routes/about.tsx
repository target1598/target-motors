import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/page-hero";
import { COMPANY } from "@/lib/company";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const { t, lang } = useLanguage();
  return (
    <main>
      <PageHero kicker={t.aboutKicker} title={t.aboutTitle} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted">
            {t.aboutBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="h-fit rounded-xl border border-rule bg-paper p-6 text-ink">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-quiet">{t.aboutTeaser}</p>
            <p className="mt-3 text-sm text-quiet">{t.aboutTeaserBody}</p>
            <p className="mt-4 font-medium">{lang === "he" ? COMPANY.addressHe : COMPANY.addressEn}</p>
            <p className="mt-1 text-sm text-quiet">{lang === "he" ? COMPANY.hoursHe : COMPANY.hoursEn}</p>
            <a href={COMPANY.phoneTel} className="mt-4 inline-block text-brand">
              {COMPANY.phoneDisplay}
            </a>
          </aside>
        </div>
      </Section>
      <section className="bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-3 sm:px-8 sm:py-20">
          {t.values.map((v) => (
            <div key={v.t} className="rounded-xl border border-rule bg-mist p-6">
              <h2 className="text-xl font-medium">{v.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-quiet">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
