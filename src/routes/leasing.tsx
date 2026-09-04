import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import { PageHero, Section } from "@/components/page-hero";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/leasing")({ component: LeasingPage });

function LeasingPage() {
  const { t } = useLanguage();
  return (
    <main>
      <PageHero kicker={t.leaseKicker} title={t.leaseTitle} sub={t.leaseSub} />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {t.leaseItems.map((item) => (
            <div key={item.t} className="rounded-xl border border-rule bg-paper p-6 text-ink">
              <h2 className="text-xl font-medium">{item.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-quiet">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="rounded-xl border border-rule bg-mist p-6 sm:p-8">
            <h2 className="text-2xl font-medium">{t.formTitle}</h2>
            <div className="mt-5">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
