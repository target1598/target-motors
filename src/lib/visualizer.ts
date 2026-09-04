export type ToyotaCombo = {
  year: string;
  series: string;
  grade: string;
  code: string;
  frames: string;
  frameCount: number;
};

export const TOYOTA_PAINT: Record<string, string> = {
  "supersonic-red": "3u5",
  "ice-cap": "040",
  "celestial-silver": "1j9",
  underground: "2ze",
  "heavy-metal": "1h1",
  "midnight-black": "218",
  blueprint: "8x8",
  meteor: "1l1",
  cypress: "6x3",
  "solar-octane": "4u3",
  "lunar-rock": "1k0",
  "wind-chill": "089",
  "ocean-gem": "8s6",
  "gr-sport": "3u5",
  woodland: "6x4",
  "heritage-blue": "8s7",
  "sand-dune": "4x4",
};

const COMBOS: Record<string, ToyotaCombo> = {
  camry: {
    year: "2026",
    series: "camry",
    grade: "nightshade",
    code: "2558",
    frames: "36",
    frameCount: 36,
  },
  "grand-highlander": {
    year: "2026",
    series: "grandhighlander",
    grade: "hybridmaxplatinum",
    code: "6732",
    frames: "36",
    frameCount: 36,
  },
  sienna: {
    year: "2026",
    series: "sienna",
    grade: "xse",
    code: "5414",
    frames: "36",
    frameCount: 36,
  },
  "4runner": {
    year: "2026",
    series: "4runner",
    grade: "trdpro",
    code: "8634",
    frames: "36",
    frameCount: 36,
  },
  "rav4-prime": {
    year: "2026",
    series: "rav4prime",
    grade: "se",
    code: "4513",
    frames: "36",
    frameCount: 36,
  },
  "land-cruiser": {
    year: "2026",
    series: "landcruiser",
    grade: "1958",
    code: "6154",
    frames: "36",
    frameCount: 36,
  },
  sequoia: {
    year: "2026",
    series: "sequoia",
    grade: "capstone",
    code: "3461",
    frames: "36",
    frameCount: 36,
  },
};

export function toyotaCombo(slug: string): ToyotaCombo | null {
  return COMBOS[slug] ?? null;
}

export function paintCode(paintId: string) {
  return TOYOTA_PAINT[paintId] ?? "040";
}

export function toyotaUrl(combo: ToyotaCombo, paintId: string, frame: number, width = 900) {
  const color = paintCode(paintId);
  const padded = String(Math.max(1, frame)).padStart(2, "0");
  return `https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/${combo.year}/${combo.series}/${combo.grade}/${combo.code}/${color}/${combo.frames}/${padded}.png?fmt=png-alpha&wid=${width}&qlt=90`;
}

export function catalogSrc(slug: string, paintId: string) {
  const combo = toyotaCombo(slug);
  if (!combo) return "";
  return toyotaUrl(combo, paintId, 29, 720);
}

export function frameCount(slug: string) {
  return toyotaCombo(slug)?.frameCount ?? 36;
}
