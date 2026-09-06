import { INTERIORS as INTERIOR_MAP, INTERIOR_SPINS, SPIN_PAINTS as SPIN_MAP, TRIM_STILLS as TRIM_LIST } from "@/lib/assets.generated";

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
  "cr-v": { frameCount: 36, catalogFrame: 23, fit: 1.85 },
  accord: { frameCount: 36, catalogFrame: 23, fit: 1.85 },
  pilot: { frameCount: 36, catalogFrame: 21, fit: 1.85 },
  odyssey: { frameCount: 36, catalogFrame: 23, fit: 1.85 },
};

const SPIN_PAINTS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(SPIN_MAP).map(([slug, paints]) => [slug, new Set(paints)]),
);
const TRIM_STILLS = new Set(TRIM_LIST);
const INTERIORS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(INTERIOR_MAP).map(([slug, ids]) => [slug, new Set(ids)]),
);
const INTERIOR_SPIN = new Set(INTERIOR_SPINS);

export const INTERIOR_FRAME_COUNT = 16;

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
  const combo = toyotaCombo(slug);
  if (!combo) return 1;
  if (combo.fit >= 1) return 0.82;
  return Math.min(0.88, combo.fit + 0.18);
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

export function paintHasSpin(slug: string, paintId: string) {
  return SPIN_PAINTS[slug]?.has(paintId) ?? false;
}

export function hasTrimStill(slug: string, trimId: string, paintId: string) {
  return TRIM_STILLS.has(`${slug}/${trimId}/${paintId}`);
}

export function trimStillSrc(slug: string, trimId: string, paintId: string) {
  return `${baseUrl()}jellies/${slug}/trims/${trimId}/${paintId}.webp`;
}

export function hasInterior(slug: string, interiorId: string) {
  return INTERIORS[slug]?.has(interiorId) ?? false;
}

export function interiorHasSpin(slug: string, interiorId: string) {
  return INTERIOR_SPIN.has(`${slug}/${interiorId}`);
}

export function interiorSrc(slug: string, interiorId: string, frame: number) {
  return `${baseUrl()}interiors/${slug}/${interiorId}/${frame}.webp`;
}
