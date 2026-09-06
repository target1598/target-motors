export type ToyotaCombo = {
  frameCount: number;
  catalogFrame: number;
  /** How much of the studio the asset should fill. Tight crops need a smaller number. */
  fit: number;
};

const COMBOS: Record<string, ToyotaCombo> = {
  camry: { frameCount: 36, catalogFrame: 33, fit: 0.62 },
  "grand-highlander": { frameCount: 36, catalogFrame: 33, fit: 0.64 },
  sienna: { frameCount: 36, catalogFrame: 33, fit: 0.62 },
  "4runner": { frameCount: 36, catalogFrame: 33, fit: 0.62 },
  "rav4-prime": { frameCount: 18, catalogFrame: 16, fit: 0.64 },
  "land-cruiser": { frameCount: 18, catalogFrame: 16, fit: 0.62 },
  sequoia: { frameCount: 36, catalogFrame: 33, fit: 0.64 },
  civic: { frameCount: 36, catalogFrame: 1, fit: 0.5 },
  "cr-v": { frameCount: 36, catalogFrame: 5, fit: 1 },
  accord: { frameCount: 36, catalogFrame: 5, fit: 1 },
  pilot: { frameCount: 36, catalogFrame: 1, fit: 1 },
  odyssey: { frameCount: 36, catalogFrame: 5, fit: 1 },
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

/** Listing tiles: a notch larger than the 360 studio, same 3/4 hero angle. */
export function cardFit(slug: string) {
  const fit = studioFit(slug);
  if (fit >= 0.95) return 1.16;
  return Math.min(0.88, fit + 0.18);
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
