import { TOYOTA_INTERIORS, type ToyotaInterior } from "./toyota-interiors.generated.ts";

/** Exact package availability from the supplied index, including deliberately empty packages. */
export function toyotaInteriorsForTrim(slug: string, trimId: string): ToyotaInterior[] {
  return TOYOTA_INTERIORS[slug]?.[trimId] ?? [];
}

export function toyotaInterior(slug: string, trimId: string, interiorId: string): ToyotaInterior | undefined {
  return toyotaInteriorsForTrim(slug, trimId).find((item) => item.id === interiorId);
}
