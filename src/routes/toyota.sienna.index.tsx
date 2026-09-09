import { createFileRoute } from "@tanstack/react-router";
import { SiennaOverview } from "@/components/sienna-overview";

export const Route = createFileRoute("/toyota/sienna/")({
  head: () => ({ meta: [
    { title: "טויוטה סיינה 2026 — גימורים, מפרט וגלריה | Target Motors" },
    { name: "description", content: "הכירו את טויוטה סיינה הייבריד 2026: רמות גימור, 7 או 8 מקומות, הנעת FWD או AWD, טכנולוגיה ותמונות. המשיכו לסטודיו לצפייה בצבעים ובתא הנוסעים." },
  ] }),
  component: SiennaOverview,
});
