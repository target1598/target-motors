import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import { Button } from "@/components/ui/button";
import { PageHero, Section } from "@/components/page-hero";
import { COMPANY, whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const { t, lang } = useLanguage();
  return (
    <main>
      <PageHero kicker={t.contactKicker} title={t.contactTitle} sub={t.contactSub} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-medium">{t.showroom}</h2>
            <ul className="mt-4 space-y-1 text-muted">
              <li>{lang === "he" ? COMPANY.addressHe : COMPANY.addressEn}</li>
              <li>{lang === "he" ? COMPANY.hoursHe : COMPANY.hoursEn}</li>
              <li>
                <a href={COMPANY.phoneTel} className="text-fg hover:text-brand">
                  {COMPANY.phoneDisplay}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={COMPANY.phoneTel}>{t.call}</a>
              </Button>
              <Button asChild variant="whatsapp">
                <a href={whatsappHref(t.whatsappPrefill)} target="_blank" rel="noreferrer">
                  {t.whatsapp}
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border border-rule bg-paper p-6 text-ink sm:p-8">
            <h2 className="text-2xl font-medium">{t.formTitle}</h2>
            <div className="mt-5">
              <LeadForm />
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
