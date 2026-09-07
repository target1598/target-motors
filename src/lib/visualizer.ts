import { INTERIORS as INTERIOR_MAP, INTERIOR_SPINS, SPIN_PAINTS as SPIN_MAP, TRIM_STILLS as TRIM_LIST } from "@/lib/assets.generated";

export type ToyotaCombo = {
  frameCount: number;
  catalogFrame: number;
  /** How much of the studio the asset should fill. Tight crops need a smaller number. */
  fit: number;
};

const COMBOS: Record<string, ToyotaCombo> = {
  camry: { frameCount: 36, catalogFrame: 33, fit: 1 },
  "grand-highlander": { frameCount: 36, catalogFrame: 33, fit: 1 },
  sienna: { frameCount: 36, catalogFrame: 33, fit: 1 },
  "4runner": { frameCount: 36, catalogFrame: 33, fit: 1 },
  "rav4-prime": { frameCount: 18, catalogFrame: 16, fit: 1 },
  "land-cruiser": { frameCount: 18, catalogFrame: 16, fit: 1 },
  sequoia: { frameCount: 36, catalogFrame: 33, fit: 1 },
  "cr-v": { frameCount: 36, catalogFrame: 23, fit: 1 },
  accord: { frameCount: 36, catalogFrame: 23, fit: 1 },
  pilot: { frameCount: 36, catalogFrame: 21, fit: 1 },
  odyssey: { frameCount: 36, catalogFrame: 23, fit: 1 },
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

export function toyotaCombo(slug: string, paintId?: string): ToyotaCombo | null {
  if (slug === "camry" && paintId === "wind-chill") {
    return { frameCount: 16, catalogFrame: 3, fit: 1 };
  }
  return COMBOS[slug] ?? null;
}

export function studioFit(slug: string) {
  return toyotaCombo(slug)?.fit ?? 1;
}

/** Listing tiles: same 3/4 hero, slight inset so the card isn't edge-to-edge. */
export function cardFit(slug: string) {
  return 0.9;
}


export function jellySrc(slug: string, paintId: string, frame: number) {
  return `${baseUrl()}jellies/${slug}/${paintId}/${frame}.webp`;
}

export function catalogSrc(slug: string, paintId: string) {
  const combo = toyotaCombo(slug, paintId);
  if (!combo) return "";
  return jellySrc(slug, paintId, combo.catalogFrame);
}

export function hondaSrc(slug: string) {
  return `${baseUrl()}cars/honda/${slug}.webp`;
}

export function frameCount(slug: string, paintId?: string) {
  return toyotaCombo(slug, paintId)?.frameCount ?? 36;
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
