export type ToyotaCombo = {
  frameCount: number;
  catalogFrame: number;
};

const COMBOS: Record<string, ToyotaCombo> = {
  camry: { frameCount: 36, catalogFrame: 29 },
  "grand-highlander": { frameCount: 36, catalogFrame: 29 },
  sienna: { frameCount: 36, catalogFrame: 29 },
  "4runner": { frameCount: 36, catalogFrame: 29 },
  "rav4-prime": { frameCount: 18, catalogFrame: 14 },
  "land-cruiser": { frameCount: 18, catalogFrame: 14 },
  sequoia: { frameCount: 36, catalogFrame: 29 },
};

function baseUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function toyotaCombo(slug: string): ToyotaCombo | null {
  return COMBOS[slug] ?? null;
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
