import { createFileRoute } from "@tanstack/react-router";
import { ToyotaShowroom } from "@/components/camry-showroom";
import { carBySlug } from "@/lib/cars";

const sienna = carBySlug("sienna")!;
export const Route = createFileRoute("/toyota/sienna/studio")({
  validateSearch: (search: Record<string, unknown>): { trim?: string } => ({
    trim: typeof search.trim === "string" && sienna.trims.some(t => t.id === search.trim) ? search.trim : undefined,
  }),
  head: () => ({ meta: [{ title: "סטודיו סיינה — גימורים וצבעים | Target Motors" }] }),
  component: SiennaStudio,
});

function SiennaStudio() {
  const { trim } = Route.useSearch();
  return <ToyotaShowroom key={trim ?? sienna.defaultTrim} car={sienna} initialTrimId={trim} siennaOverview />;
}
