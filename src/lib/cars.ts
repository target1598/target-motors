import { catalogSrc, hondaSrc } from "@/lib/visualizer";

export type Text = { he: string; en: string };
export type Paint = { id: string; name: Text; hex: string };
export type Spec = { label: Text; value: Text };
export type TrimLevel = {
  id: string;
  name: Text;
  blurb: Text;
  colors?: string[];
  specs?: Spec[];
  highlights?: Text[];
  hybrid?: boolean;
  plugin?: boolean;
  seats?: number;
};
export type Car = {
  slug: string;
  brand: "toyota" | "honda";
  year: number;
  name: Text;
  tagline: Text;
  description: Text;
  body: "sedan" | "suv" | "minivan" | "pickup";
  seats: number;
  hybrid?: boolean;
  plugin?: boolean;
  featured?: boolean;
  defaultTrim: string;
  defaultColor: string;
  colors: Paint[];
  trims: TrimLevel[];
  specs: Spec[];
  highlights: Text[];
};

export const BODY_LABEL: Record<Car["body"], Text> = {
  sedan: { he: "סדאן", en: "Sedan" },
  suv: { he: "רכב פנאי", en: "SUV" },
  minivan: { he: "מיניוואן", en: "Minivan" },
  pickup: { he: "טנדר", en: "Pickup" },
};

export const BRAND_LABEL = {
  toyota: { he: "טויוטה", en: "Toyota" },
  honda: { he: "הונדה", en: "Honda" },
};

const P = {
  red: { id: "supersonic-red", name: { he: "סופרסוניק רד", en: "Supersonic Red" }, hex: "#b5121b" },
  ice: { id: "ice-cap", name: { he: "אייס קאפ", en: "Ice Cap" }, hex: "#f2f2f0" },
  silver: { id: "celestial-silver", name: { he: "סילבר סלסטיאל", en: "Celestial Silver" }, hex: "#c5c7c8" },
  under: { id: "underground", name: { he: "אנדרגראונד", en: "Underground" }, hex: "#4a4e51" },
  metal: { id: "heavy-metal", name: { he: "הבי מטאל", en: "Heavy Metal" }, hex: "#6d6f71" },
  black: { id: "midnight-black", name: { he: "שחור מידנייט", en: "Midnight Black" }, hex: "#1a1a1a" },
  blue: { id: "blueprint", name: { he: "בלופרינט", en: "Blueprint" }, hex: "#2c4a6e" },
  octane: { id: "solar-octane", name: { he: "סולר אוקטן", en: "Solar Octane" }, hex: "#c45a12" },
  lunar: { id: "lunar-rock", name: { he: "לונר רוק", en: "Lunar Rock" }, hex: "#8a8b83" },
  wind: { id: "wind-chill", name: { he: "ווינד צ׳יל", en: "Wind Chill Pearl" }, hex: "#d8d6cf" },
  ocean: { id: "ocean-gem", name: { he: "אושן ג׳ם", en: "Ocean Gem" }, hex: "#1f4f6a" },
  sand: { id: "sand-dune", name: { he: "סנד דיון", en: "Sand Dune" }, hex: "#c4b089" },
  wave: { id: "wave-maker", name: { he: "ווייב מייקר", en: "Wave Maker" }, hex: "#1a8a9a" },
  storm: { id: "storm-cloud", name: { he: "סטורם קלאוד", en: "Storm Cloud" }, hex: "#5c5e62" },
  cypress: { id: "cypress", name: { he: "סייפרס", en: "Cypress" }, hex: "#3f4a40" },
  wood: { id: "woodland", name: { he: "וודלנד", en: "Woodland" }, hex: "#6a6e68" },
  meteor: { id: "meteor", name: { he: "מטאור", en: "Meteor" }, hex: "#3a4146" },
  trail: { id: "trail-dust", name: { he: "טרייל דאסט", en: "Trail Dust" }, hex: "#9a947c" },
  iceberg: { id: "iceberg", name: { he: "אייסברג", en: "Iceberg" }, hex: "#2a2a2a" },
  magnetic: { id: "magnetic-gray", name: { he: "אפור מגנטי", en: "Magnetic Gray" }, hex: "#4b4b4b" },
  hWhite: { id: "platinum-white-pearl", name: { he: "פלטינום וייט פירל", en: "Platinum White Pearl" }, hex: "#f4f4f1" },
  hBlack: { id: "crystal-black-pearl", name: { he: "קריסטל בלק פירל", en: "Crystal Black Pearl" }, hex: "#111111" },
  hRed: { id: "rallye-red", name: { he: "ראלי רד", en: "Rallye Red" }, hex: "#b23232" },
  hSilver: { id: "solar-silver-metallic", name: { he: "סולר סילבר", en: "Solar Silver Metallic" }, hex: "#838589" },
  hBlue: { id: "seabed-blue-pearl", name: { he: "סיבד בלו פירל", en: "Seabed Blue Pearl" }, hex: "#333f56" },
  hGray: { id: "urban-grey-pearl", name: { he: "אורבן גריי פירל", en: "Urban Gray Pearl" }, hex: "#6a6a6b" },
  hRadiant: { id: "radiant-red-metallic", name: { he: "ריידיאנט רד", en: "Radiant Red Metallic" }, hex: "#6c151c" },
  hRadiant2: { id: "radiant-red-metallic-ii", name: { he: "ריידיאנט רד II", en: "Radiant Red Metallic II" }, hex: "#8f1521" },
  hNight: { id: "still-night-pearl", name: { he: "סטיל נייט פירל", en: "Still Night Pearl" }, hex: "#202673" },
  hCanyon: { id: "canyon-river-blue-metallic", name: { he: "קניון ריבר בלו", en: "Canyon River Blue Metallic" }, hex: "#1a1e2d" },
  hMeteor: { id: "meteoroid-grey-metallic", name: { he: "מטאורייט גריי", en: "Meteorite Gray Metallic" }, hex: "#373c43" },
  hSteel: { id: "modern-steel-metallic", name: { he: "מודרן סטיל", en: "Modern Steel Metallic" }, hex: "#5b5b5b" },
  hSonic: { id: "sonic-grey-pearl", name: { he: "סוניק גריי פירל", en: "Sonic Gray Pearl" }, hex: "#55616a" },
  hAsh: { id: "ash-green-metallic", name: { he: "אש גרין", en: "Ash Green Metallic" }, hex: "#515850" },
};

function toyota(
  slug: string,
  name: Text,
  tagline: Text,
  description: Text,
  body: Car["body"],
  seats: number,
  extra: Partial<Car> & { trims: TrimLevel[]; colors: Paint[]; specs: Spec[]; highlights: Text[] },
): Car {
  return {
    slug,
    brand: "toyota",
    year: 2026,
    name,
    tagline,
    description,
    body,
    seats,
    featured: true,
    defaultTrim: extra.trims[0]?.id ?? "le",
    defaultColor: extra.defaultColor ?? extra.colors[0]?.id ?? "ice-cap",
    ...extra,
  };
}

export const CARS: Car[] = [
  toyota(
    "camry",
    { he: "טויוטה קאמרי הייבריד", en: "Toyota Camry Hybrid" },
    { he: "סדאן היברידית שקטה, חדה וחסכונית", en: "A quiet, sharp, efficient hybrid sedan" },
    {
      he: "קאמרי 2026 מגיעה כהיברידית בלבד בארה״ב. חמישה מקומות, Toyota Safety Sense, ורמות גימור מ־LE עד XSE ו־Nightshade.",
      en: "The 2026 Camry is hybrid-only in the US. Five seats, Toyota Safety Sense, and trims from LE through XSE and Nightshade.",
    },
    "sedan",
    5,
    {
      hybrid: true,
      defaultTrim: "xse",
      defaultColor: "supersonic-red",
      colors: [P.red, P.ice],
      trims: [
        { id: "le", name: { he: "LE", en: "LE" }, blurb: { he: "בסיס היברידי עם מסך 8״.", en: "Hybrid base with 8\" screen." } },
        { id: "se", name: { he: "SE", en: "SE" }, blurb: { he: "מתלים ספורטיביים וגלגלי 18״.", en: "Sport-tuned suspension and 18\" wheels." } },
        { id: "nightshade", name: { he: "Nightshade", en: "Nightshade" }, blurb: { he: "חבילת שחור חיצונית.", en: "Blacked-out exterior package." } },
        { id: "xle", name: { he: "XLE", en: "XLE" }, blurb: { he: "נוחות ועור.", en: "Comfort and leather." } },
        { id: "xse", name: { he: "XSE", en: "XSE" }, blurb: { he: "גלגלי 19״ ונוכחות ספורטיבית.", en: "19\" wheels and sport presence." } },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית · FWD / AWD", en: "Hybrid · FWD / AWD" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
        { label: { he: "בטיחות", en: "Safety" }, value: { he: "Toyota Safety Sense 3.0", en: "Toyota Safety Sense 3.0" } },
      ],
      highlights: [
        { he: "היברידית בכל רמות הגימור", en: "Hybrid across every trim" },
        { he: "חבילת Nightshade", en: "Nightshade package" },
      ],
    },
  ),
  toyota(
    "grand-highlander",
    { he: "טויוטה גרנד היילנדר", en: "Toyota Grand Highlander" },
    { he: "שלושה טורים למשפחה הגדולה", en: "Three rows for a large family" },
    {
      he: "גרנד היילנדר 2026 — שבעה או שמונה מקומות, מרווח אמיתי בשורה השלישית, והיבריד מקס בגימורי הפרימיום.",
      en: "2026 Grand Highlander — seven or eight seats, real third-row space, and Hybrid MAX on premium trims.",
    },
    "suv",
    8,
    {
      hybrid: true,
      defaultTrim: "limited",
      defaultColor: "storm-cloud",
      colors: [P.storm, P.cypress],
      trims: [
        { id: "xle", name: { he: "XLE", en: "XLE" }, blurb: { he: "שלושה טורים ומסך גדול.", en: "Three rows and a large screen." } },
        { id: "limited", name: { he: "Limited", en: "Limited" }, blurb: { he: "ציוד עשיר והיבריד.", en: "Loaded hybrid." } },
        { id: "platinum", name: { he: "Platinum", en: "Platinum" }, blurb: { he: "קצה הפרימיום.", en: "Top of the range." } },
      ],
      specs: [
        { label: { he: "מושבים", en: "Seats" }, value: { he: "7 או 8", en: "7 or 8" } },
        { label: { he: "טורים", en: "Rows" }, value: { he: "3", en: "3" } },
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היבריד / Hybrid MAX", en: "Hybrid / Hybrid MAX" } },
      ],
      highlights: [
        { he: "שורה שלישית שמישה", en: "Usable third row" },
        { he: "Hybrid MAX", en: "Hybrid MAX" },
      ],
    },
  ),
  toyota(
    "sienna",
    { he: "טויוטה סיינה הייבריד", en: "Toyota Sienna Hybrid" },
    { he: "מיניוואן היברידי עם דלתות הזזה", en: "Hybrid minivan with sliding doors" },
    {
      he: "סיינה 2026 היברידית בלבד. עד שמונה מקומות, דלתות הזזה, וגרסת Woodland לשטח קל.",
      en: "The 2026 Sienna is hybrid-only. Up to eight seats, sliding doors, and a Woodland trim for light off-road.",
    },
    "minivan",
    8,
    {
      hybrid: true,
      defaultTrim: "xse",
      defaultColor: "woodland",
      colors: [P.wood],
      trims: [
        { id: "le", name: { he: "LE", en: "LE" }, blurb: { he: "בסיס משפחתי היברידי.", en: "Hybrid family base." } },
        { id: "xse", name: { he: "XSE", en: "XSE" }, blurb: { he: "עיצוב ספורטיבי.", en: "Sportier look." } },
        { id: "woodland", name: { he: "Woodland", en: "Woodland" }, blurb: { he: "גחון מוגן וצמיגי שטח.", en: "Skid plate and all-terrain tires." } },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית · AWD זמין", en: "Hybrid · AWD available" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "7 או 8", en: "7 or 8" } },
      ],
      highlights: [
        { he: "היברידית בכל הגימורים", en: "Hybrid in every trim" },
        { he: "דלתות הזזה חשמליות", en: "Power sliding doors" },
      ],
    },
  ),
  toyota(
    "4runner",
    { he: "טויוטה פורראנר", en: "Toyota 4Runner" },
    { he: "שטח אמיתי, דור חדש", en: "Real off-road, new generation" },
    {
      he: "פורראנר 2026 על פלטפורמת TNGA-F. TRD Pro עם מתלים רציניים, ואופציית i-FORCE MAX.",
      en: "2026 4Runner on the TNGA-F platform. TRD Pro with serious suspension, and i-FORCE MAX available.",
    },
    "suv",
    5,
    {
      defaultTrim: "trd-pro",
      defaultColor: "wave-maker",
      colors: [P.wave, P.ice],
      trims: [
        { id: "sr5", name: { he: "SR5", en: "SR5" }, blurb: { he: "בסיס שטח.", en: "Off-road base." } },
        { id: "trd-pro", name: { he: "TRD Pro", en: "TRD Pro" }, blurb: { he: "קצה השטח של טויוטה.", en: "Toyota's off-road peak." } },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "4x4 · i-FORCE / MAX", en: "4x4 · i-FORCE / MAX" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      ],
      highlights: [
        { he: "דור חדש לגמרי", en: "All-new generation" },
        { he: "TRD Pro", en: "TRD Pro" },
      ],
    },
  ),
  toyota(
    "rav4-prime",
    { he: "טויוטה RAV4 פלאג־אין", en: "Toyota RAV4 Plug-in Hybrid" },
    { he: "פלאג־אין עם טווח חשמלי אמיתי", en: "Plug-in with real electric range" },
    {
      he: "RAV4 Prime 2026 — פלאג־אין הייבריד עם האצה חדה וטווח חשמלי יומיומי. ייבוא מארה״ב.",
      en: "2026 RAV4 Prime — plug-in hybrid with sharp acceleration and everyday electric range. US import.",
    },
    "suv",
    5,
    {
      hybrid: true,
      plugin: true,
      defaultTrim: "se",
      defaultColor: "midnight-black",
      colors: [P.black, P.blue, P.metal],
      trims: [
        { id: "se", name: { he: "SE", en: "SE" }, blurb: { he: "פלאג־אין ספורטיבי.", en: "Sporty plug-in." } },
        { id: "xse", name: { he: "XSE", en: "XSE" }, blurb: { he: "גימור גבוה יותר.", en: "Higher trim." } },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "פלאג־אין הייבריד AWD", en: "Plug-in hybrid AWD" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      ],
      highlights: [
        { he: "טעינה מהשקע בבית", en: "Charge at home" },
        { he: "AWD", en: "AWD" },
      ],
    },
  ),
  toyota(
    "land-cruiser",
    { he: "טויוטה לנד קרוזר", en: "Toyota Land Cruiser" },
    { he: "אגדה שחזרה לארה״ב", en: "The legend, back in the US" },
    {
      he: "לנד קרוזר 2026 — i-FORCE MAX הייבריד, שטח קשוח, ועיצוב 1958 כאופציה.",
      en: "2026 Land Cruiser — i-FORCE MAX hybrid, serious off-road, and the 1958 heritage look as an option.",
    },
    "suv",
    5,
    {
      hybrid: true,
      defaultTrim: "1958",
      defaultColor: "meteor",
      colors: [P.meteor, P.trail, P.iceberg],
      trims: [
        { id: "1958", name: { he: "1958", en: "1958" }, blurb: { he: "עיצוב מורשת.", en: "Heritage look." } },
        { id: "land-cruiser", name: { he: "Land Cruiser", en: "Land Cruiser" }, blurb: { he: "גימור מלא.", en: "Full trim." } },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "i-FORCE MAX הייבריד 4x4", en: "i-FORCE MAX hybrid 4x4" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      ],
      highlights: [
        { he: "היבריד חזק לשטח", en: "Strong hybrid for dirt" },
        { he: "חבילת 1958", en: "1958 package" },
      ],
    },
  ),
  toyota(
    "sequoia",
    { he: "טויוטה סקויה", en: "Toyota Sequoia" },
    { he: "SUV גדול עם שלושה טורים", en: "Full-size SUV with three rows" },
    {
      he: "סקויה 2026 — i-FORCE MAX, עד שמונה מקומות, וגימור Capstone בקצה.",
      en: "2026 Sequoia — i-FORCE MAX, up to eight seats, Capstone at the top.",
    },
    "suv",
    8,
    {
      hybrid: true,
      defaultTrim: "capstone",
      defaultColor: "supersonic-red",
      colors: [P.red, P.ice, P.black, P.silver, P.cypress, P.blue, P.magnetic],
      trims: [
        { id: "sr5", name: { he: "SR5", en: "SR5" }, blurb: { he: "בסיס משפחתי גדול.", en: "Big family base." } },
        { id: "capstone", name: { he: "Capstone", en: "Capstone" }, blurb: { he: "פרימיום מלא.", en: "Full premium." } },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "i-FORCE MAX", en: "i-FORCE MAX" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "עד 8", en: "Up to 8" } },
      ],
      highlights: [
        { he: "שלושה טורים", en: "Three rows" },
        { he: "Capstone", en: "Capstone" },
      ],
    },
  ),
  {
    slug: "odyssey",
    brand: "honda",
    year: 2026,
    name: { he: "הונדה אודיסי", en: "Honda Odyssey" },
    tagline: { he: "מיניוואן משפחתי עם דלתות הזזה", en: "Family minivan with sliding doors" },
    description: {
      he: "אודיסי 2026 מארה״ב — עד שמונה מקומות, Magic Slide, ו־Honda Sensing. ייבוא מקביל.",
      en: "2026 US Odyssey — up to eight seats, Magic Slide, and Honda Sensing. Parallel import.",
    },
    body: "minivan",
    seats: 8,
    featured: true,
    defaultTrim: "touring",
    defaultColor: "platinum-white-pearl",
    colors: [P.hWhite, P.hBlack, P.hRadiant2, P.hSilver, P.hSteel, P.hSonic],
    trims: [
      { id: "ex-l", name: { he: "EX-L", en: "EX-L" }, blurb: { he: "משפחתי מצויד.", en: "Well-equipped family." } },
      { id: "touring", name: { he: "Touring", en: "Touring" }, blurb: { he: "קצה הנוחות.", en: "Comfort peak." } },
      { id: "elite", name: { he: "Elite", en: "Elite" }, blurb: { he: "גימור מלא.", en: "Fully loaded." } },
    ],
    specs: [
      { label: { he: "מנוע", en: "Engine" }, value: { he: "3.5L V6", en: "3.5L V6" } },
      { label: { he: "מושבים", en: "Seats" }, value: { he: "עד 8", en: "Up to 8" } },
      { label: { he: "בטיחות", en: "Safety" }, value: { he: "Honda Sensing", en: "Honda Sensing" } },
    ],
    highlights: [
      { he: "Magic Slide", en: "Magic Slide" },
      { he: "דלתות הזזה חשמליות", en: "Power sliding doors" },
    ],
  },
  {
    slug: "civic",
    brand: "honda",
    year: 2026,
    name: { he: "הונדה סיוויק הייבריד", en: "Honda Civic Hybrid" },
    tagline: { he: "סדאן היברידית חדה וחסכונית", en: "A sharp, efficient hybrid sedan" },
    description: {
      he: "סיוויק 2026 מארה״ב — הייבריד 200 כ״ס בגימורי Sport, Honda Sensing, ועיצוב עדכני.",
      en: "2026 US Civic — 200-hp hybrid on Sport trims, Honda Sensing, current design.",
    },
    body: "sedan",
    seats: 5,
    hybrid: true,
    featured: true,
    defaultTrim: "sport-hybrid",
    defaultColor: "rallye-red",
    colors: [P.hRed, P.hWhite, P.hBlack, P.hGray, P.hSilver, P.hBlue],
    trims: [
      { id: "lx", name: { he: "LX", en: "LX" }, blurb: { he: "בסיס סדאן.", en: "Sedan base." } },
      { id: "sport-hybrid", name: { he: "Sport Hybrid", en: "Sport Hybrid" }, blurb: { he: "היבריד 200 כ״ס.", en: "200-hp hybrid." } },
      { id: "sport-touring-hybrid", name: { he: "Sport Touring Hybrid", en: "Sport Touring Hybrid" }, blurb: { he: "קצה הגימור ההיברידי.", en: "Top hybrid trim." } },
    ],
    specs: [
      { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית · 200 כ״ס", en: "Hybrid · 200 hp" } },
      { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      { label: { he: "בטיחות", en: "Safety" }, value: { he: "Honda Sensing", en: "Honda Sensing" } },
    ],
    highlights: [
      { he: "היברידית 200 כ״ס", en: "200-hp hybrid" },
      { he: "Honda Sensing", en: "Honda Sensing" },
    ],
  },
  {
    slug: "cr-v",
    brand: "honda",
    year: 2026,
    name: { he: "הונדה CR-V הייבריד", en: "Honda CR-V Hybrid" },
    tagline: { he: "רכב פנאי משפחתי, עכשיו גם TrailSport", en: "Family SUV, now with TrailSport" },
    description: {
      he: "CR-V 2026 מארה״ב — הייבריד 204 כ״ס, AWD, וגימור TrailSport Hybrid לשטח קל.",
      en: "2026 US CR-V — 204-hp hybrid, AWD, and a TrailSport Hybrid trim for light off-road.",
    },
    body: "suv",
    seats: 5,
    hybrid: true,
    defaultTrim: "sport-hybrid",
    defaultColor: "radiant-red-metallic",
    colors: [P.hRadiant, P.hWhite, P.hBlack, P.hSilver, P.hGray, P.hCanyon, P.hMeteor, P.hNight],
    trims: [
      { id: "ex-l", name: { he: "EX-L", en: "EX-L" }, blurb: { he: "נוחות יומיומית.", en: "Everyday comfort." } },
      { id: "sport-hybrid", name: { he: "Sport Hybrid", en: "Sport Hybrid" }, blurb: { he: "היבריד AWD.", en: "Hybrid AWD." } },
      { id: "trailsport-hybrid", name: { he: "TrailSport Hybrid", en: "TrailSport Hybrid" }, blurb: { he: "שטח קל עם צמיגי שטח.", en: "Light off-road with A/T tires." } },
    ],
    specs: [
      { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית AWD · 204 כ״ס", en: "Hybrid AWD · 204 hp" } },
      { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      { label: { he: "בטיחות", en: "Safety" }, value: { he: "Honda Sensing", en: "Honda Sensing" } },
    ],
    highlights: [
      { he: "TrailSport Hybrid", en: "TrailSport Hybrid" },
      { he: "AWD", en: "AWD" },
    ],
  },
  {
    slug: "accord",
    brand: "honda",
    year: 2026,
    name: { he: "הונדה אקורד הייבריד", en: "Honda Accord Hybrid" },
    tagline: { he: "סדאן מנהלים היברידית", en: "Hybrid executive sedan" },
    description: {
      he: "אקורד 2026 מארה״ב — היברידית, מרווחת, Honda Sensing בכל הגימורים.",
      en: "2026 US Accord — hybrid, spacious, Honda Sensing on every trim.",
    },
    body: "sedan",
    seats: 5,
    hybrid: true,
    defaultTrim: "touring-hybrid",
    defaultColor: "radiant-red-metallic",
    colors: [P.hRadiant, P.hWhite, P.hBlack, P.hSilver, P.hGray, P.hCanyon, P.hMeteor, P.hNight],
    trims: [
      { id: "sport-hybrid", name: { he: "Sport Hybrid", en: "Sport Hybrid" }, blurb: { he: "היבריד ספורטיבי.", en: "Sporty hybrid." } },
      { id: "touring-hybrid", name: { he: "Touring Hybrid", en: "Touring Hybrid" }, blurb: { he: "קצה הגימור.", en: "Top trim." } },
    ],
    specs: [
      { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית · 204 כ״ס", en: "Hybrid · 204 hp" } },
      { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      { label: { he: "בטיחות", en: "Safety" }, value: { he: "Honda Sensing", en: "Honda Sensing" } },
    ],
    highlights: [
      { he: "היברידית בכל הגימורים", en: "Hybrid across trims" },
      { he: "Honda Sensing", en: "Honda Sensing" },
    ],
  },
  {
    slug: "pilot",
    brand: "honda",
    year: 2026,
    name: { he: "הונדה פיילוט", en: "Honda Pilot" },
    tagline: { he: "שלושה טורים למשפחה", en: "Three rows for the family" },
    description: {
      he: "פיילוט 2026 מארה״ב — עד שמונה מקומות, V6 285 כ״ס, TrailSport לשטח קל.",
      en: "2026 US Pilot — up to eight seats, 285-hp V6, TrailSport for light off-road.",
    },
    body: "suv",
    seats: 8,
    defaultTrim: "trailsport",
    defaultColor: "ash-green-metallic",
    colors: [P.hAsh, P.hWhite, P.hBlack, P.hSilver, P.hSteel, P.hSonic, P.hRadiant2],
    trims: [
      { id: "sport", name: { he: "Sport", en: "Sport" }, blurb: { he: "שלושה טורים יומיומי.", en: "Everyday three-row." } },
      { id: "trailsport", name: { he: "TrailSport", en: "TrailSport" }, blurb: { he: "שטח קל.", en: "Light off-road." } },
      { id: "elite", name: { he: "Elite", en: "Elite" }, blurb: { he: "קצה הפרימיום.", en: "Premium peak." } },
    ],
    specs: [
      { label: { he: "מנוע", en: "Engine" }, value: { he: "3.5L V6 · 285 כ״ס", en: "3.5L V6 · 285 hp" } },
      { label: { he: "מושבים", en: "Seats" }, value: { he: "עד 8", en: "Up to 8" } },
      { label: { he: "טורים", en: "Rows" }, value: { he: "3", en: "3" } },
    ],
    highlights: [
      { he: "שלושה טורים", en: "Three rows" },
      { he: "TrailSport", en: "TrailSport" },
    ],
  },
];

export function carsByBrand(brand: Car["brand"]) {
  return CARS.filter((c) => c.brand === brand);
}
export function carBySlug(slug: string) {
  return CARS.find((c) => c.slug === slug);
}
export function featuredCars() {
  return CARS.filter((c) => c.featured);
}
export function colorsForTrim(car: Car, trimId: string): Paint[] {
  const trim = car.trims.find((t) => t.id === trimId);
  if (!trim?.colors?.length) return car.colors;
  return car.colors.filter((c) => trim.colors!.includes(c.id));
}
export function carImage(car: Car) {
  return catalogSrc(car.slug, car.defaultColor) || hondaSrc(car.slug) || `${import.meta.env.BASE_URL}cars/fallback.svg`;
}
