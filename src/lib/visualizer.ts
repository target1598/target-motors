import { INTERIORS as INTERIOR_MAP, INTERIOR_SPINS, SPIN_PAINTS as SPIN_MAP, TRIM_SPINS as TRIM_SPIN_LIST, TRIM_STILLS as TRIM_LIST } from "@/lib/assets.generated";
import { TOYOTA_INTERIORS } from "@/lib/toyota-interiors.generated";
import { toyotaInterior } from "@/lib/toyota-interiors";

export type ToyotaCombo = {
  frameCount: number;
  catalogFrame: number;
  /** How much of the studio the asset should fill. Tight crops need a smaller number. */
  fit: number;
  /** Frame file extension. Toyota jellies are PNG; older spins are webp. */
  ext?: "png" | "webp";
  /** CSS aspect-ratio matching the source frames, e.g. "1090/482". */
  aspect?: string;
  /** Degrees for each frame index (1-based). */
  angles?: number[];
  /** Composite the car onto the Target Motors showroom photo. */
  showroom?: boolean;
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

/** Official Toyota 16-view jelly, 22.5° steps, starting at front (0°). Stable identity. */
const CAMRY_PNG_ANGLES = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];
/** The supplied Toyota trim spins share the same transparent frame and showroom pad. */
const CAMRY_SHOWROOM: ToyotaCombo = {
  frameCount: 16,
  catalogFrame: 3,
  fit: 0.55,
  ext: "png",
  aspect: "2/1",
  angles: CAMRY_PNG_ANGLES,
  showroom: true,
};

const SPIN_PAINTS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(SPIN_MAP).map(([slug, paints]) => [slug, new Set(paints)]),
);
const TRIM_STILLS = new Set(TRIM_LIST);
const TRIM_SPINS = new Set(TRIM_SPIN_LIST);
const INTERIORS: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(INTERIOR_MAP).map(([slug, ids]) => [slug, new Set(ids)]),
);
const INTERIOR_SPIN = new Set(INTERIOR_SPINS);

export const INTERIOR_FRAME_COUNT = 16;

function baseUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

function trimSpinKey(slug: string, trimId: string, paintId: string) {
  return `${slug}/${trimId}/${paintId}`;
}

export function hasTrimSpin(slug: string, trimId: string, paintId: string) {
  return TRIM_SPINS.has(trimSpinKey(slug, trimId, paintId));
}

export function toyotaCombo(slug: string, paintId?: string, trimId?: string): ToyotaCombo | null {
  if (slug && trimId && paintId && hasTrimSpin(slug, trimId, paintId)) return CAMRY_SHOWROOM;
  if (slug === "camry" && paintId === "wind-chill") return CAMRY_SHOWROOM;
  return COMBOS[slug] ?? null;
}

export function showroomSrc() {
  return `${baseUrl()}studio/turntable.jpg`;
}

export function studioFit(slug: string) {
  return toyotaCombo(slug)?.fit ?? 1;
}

/** Listing tiles: same 3/4 hero, slight inset so the card isn't edge-to-edge. */
export function cardFit(slug: string) {
  return 0.9;
}

export function jellySrc(slug: string, paintId: string, frame: number, trimId?: string) {
  if (trimId && hasTrimSpin(slug, trimId, paintId)) {
    return `${baseUrl()}jellies/${slug}/${trimId}/${paintId}/${frame}.png`;
  }
  const ext = toyotaCombo(slug, paintId, trimId)?.ext ?? "webp";
  return `${baseUrl()}jellies/${slug}/${paintId}/${frame}.${ext}`;
}

export function catalogSrc(slug: string, paintId: string, trimId?: string) {
  const combo = toyotaCombo(slug, paintId, trimId);
  if (!combo) return "";
  return jellySrc(slug, paintId, combo.catalogFrame, trimId);
}

export function hondaSrc(slug: string) {
  return `${baseUrl()}cars/honda/${slug}.webp`;
}

export function frameCount(slug: string, paintId?: string, trimId?: string) {
  return toyotaCombo(slug, paintId, trimId)?.frameCount ?? 36;
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

export function isFolderSpin(slug: string) {
  const prefix = `${slug}/`;
  for (const key of TRIM_SPINS) {
    if (key.startsWith(prefix)) return true;
  }
  return false;
}

/** Folder-driven models only offer a colour when that trim has a 360. */
export function colorHasVisual(slug: string, trimId: string, paintId: string) {
  if (hasTrimSpin(slug, trimId, paintId)) return true;
  if (isFolderSpin(slug)) return false;
  if (hasTrimStill(slug, trimId, paintId)) return true;
  return paintHasSpin(slug, paintId);
}

export function hasInterior(slug: string, interiorId: string, trimId?: string) {
  if (TOYOTA_INTERIORS[slug]) return Boolean(trimId && toyotaInterior(slug, trimId, interiorId));
  return INTERIORS[slug]?.has(interiorId) ?? false;
}

export function interiorHasSpin(slug: string, interiorId: string) {
  return INTERIOR_SPIN.has(`${slug}/${interiorId}`);
}

export function interiorSrc(slug: string, interiorId: string, frame: number, trimId?: string) {
  if (TOYOTA_INTERIORS[slug]) {
    const views = trimId ? toyotaInterior(slug, trimId, interiorId)?.views : undefined;
    const view = views?.[frame - 1];
    return view ? `${baseUrl()}${view.src}` : "";
  }
  return `${baseUrl()}interiors/${slug}/${interiorId}/${frame}.webp`;
}

export function frameAngle(slug: string, paintId: string, frame: number, trimId?: string) {
  const angles = toyotaCombo(slug, paintId, trimId)?.angles;
  if (!angles?.length) return null;
  return angles[frame - 1] ?? null;
}
