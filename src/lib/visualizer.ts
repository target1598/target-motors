export type ToyotaCombo = {
  frameCount: number;
  catalogFrame: number;
  /** How much of the studio the asset should fill. Tight crops need a smaller number. */
  fit: number;
};

const COMBOS: Record<string, ToyotaCombo> = {
  camry: { frameCount: 36, catalogFrame: 29, fit: 0.62 },
  "grand-highlander": { frameCount: 36, catalogFrame: 29, fit: 0.64 },
  sienna: { frameCount: 36, catalogFrame: 29, fit: 0.62 },
  "4runner": { frameCount: 36, catalogFrame: 29, fit: 0.62 },
  "rav4-prime": { frameCount: 18, catalogFrame: 14, fit: 0.64 },
  "land-cruiser": { frameCount: 18, catalogFrame: 14, fit: 0.62 },
  sequoia: { frameCount: 36, catalogFrame: 29, fit: 0.64 },
  civic: { frameCount: 36, catalogFrame: 1, fit: 0.5 },
  "cr-v": { frameCount: 36, catalogFrame: 1, fit: 1 },
  accord: { frameCount: 36, catalogFrame: 1, fit: 1 },
  pilot: { frameCount: 36, catalogFrame: 1, fit: 1 },
  odyssey: { frameCount: 36, catalogFrame: 1, fit: 1 },
};

function baseUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function toyotaCombo(slug: string): ToyotaCombo | null {
  return COMBOS[slug] ?? null;
}

export function studioFit(slug: string) {
  return toyotaCombo(slug)?.fit ?? 1;
}

export function jellySrc(slug: string, paintId: string, frame: number) {
  return `${baseUrl()}jellies/${slug}/${paintId}/${frame}.webp`;
}

export function catalogSrc(slug: string, paintId: string) {
  const combo = toyotaCombo(slug);
  if (!combo) return "";
  return jellySrc(slug, paintId, combo.catalogFrame);
}

export function hondaSrc(slug: string) {
  return `${baseUrl()}cars/honda/${slug}.webp`;
}

export function frameCount(slug: string) {
  return toyotaCombo(slug)?.frameCount ?? 36;
}
