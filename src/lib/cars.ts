import { catalogSrc } from "@/lib/visualizer";


export type Text = { he: string; en: string };
export type Paint = { id: string; name: Text; hex: string };
export type Interior = { id: string; name: Text; hex: string };
export type Spec = { label: Text; value: Text };
export type TrimLevel = {
  id: string;
  name: Text;
  blurb: Text;
  colors?: string[];
  interiors?: string[];
  distinctExterior?: boolean;
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
  defaultInterior: string;
  colors: Paint[];
  interiors: Interior[];
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
  white: { id: "ice-cap", name: { he: "לבן", en: "White" }, hex: "#f2f2f0" },
  metalRoof: { id: "heavy-metal-black-roof", name: { he: "הבי מטאל · גג שחור", en: "Heavy Metal with Black Roof" }, hex: "#6d6f71" },
  oceanRoof: { id: "ocean-gem-black-roof", name: { he: "אושן ג׳ם · גג שחור", en: "Ocean Gem with Black Roof" }, hex: "#1f4f6a" },
  windRoof: { id: "wind-chill-black-roof", name: { he: "ווינד צ׳יל · גג שחור", en: "Wind Chill Pearl with Black Roof" }, hex: "#d8d6cf" },
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
  cosmos: { id: "dark-cosmos", name: { he: "דארק קוסמוס", en: "Dark Cosmos" }, hex: "#2a3348" },
  reservoir: { id: "reservoir-blue", name: { he: "רזרבואר בלו", en: "Reservoir Blue" }, hex: "#3d5c78" },
  ruby: { id: "ruby-flare", name: { he: "רובי פלייר", en: "Ruby Flare Pearl" }, hex: "#7a1a22" },
  cement: { id: "cement", name: { he: "סמנט", en: "Cement" }, hex: "#8b8d88" },
  heritage: { id: "heritage-blue", name: { he: "הריטג׳ בלו", en: "Heritage Blue" }, hex: "#2c4c6e" },
  everest: { id: "everest", name: { he: "אוורסט", en: "Everest" }, hex: "#4a5c48" },
  cutting: { id: "cutting-edge", name: { he: "קאטינג אדג׳", en: "Cutting Edge" }, hex: "#c4c4bc" },
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
  hSmoke: { id: "smoke-blue-pearl", name: { he: "סמוק בלו פירל", en: "Smoke Blue Pearl" }, hex: "#5a6d7c" },
};

const I = {
  boulder: { id: "boulder-fabric", name: { he: "בד בולדר", en: "Boulder fabric" }, hex: "#9a9b94" },
  blackSoftex: { id: "black-softex", name: { he: "סופטקס שחור", en: "Black SofTex" }, hex: "#1c1c1c" },
  grayLeather: { id: "light-gray-leather", name: { he: "עור אפור בהיר", en: "Light gray leather" }, hex: "#c4c5c0" },
  cockpit: { id: "cockpit-red", name: { he: "קוקפיט רד", en: "Cockpit Red" }, hex: "#7a1c24" },
  grayFabric: { id: "gray-fabric", name: { he: "בד אפור", en: "Gray fabric" }, hex: "#8d8e89" },
  graySoftex: { id: "gray-softex", name: { he: "סופטקס אפור", en: "Gray SofTex" }, hex: "#7a7b76" },
  moonstone: { id: "moonstone-softex", name: { he: "מונסטון / שחור", en: "Moonstone/Black SofTex" }, hex: "#d5d4ce" },
  blackLeather: { id: "black-leather", name: { he: "עור שחור", en: "Black leather" }, hex: "#141414" },
  macadamia: { id: "macadamia-leather", name: { he: "מקדמיה", en: "Macadamia leather" }, hex: "#c4ad8c" },
  blackFabric: { id: "black-fabric", name: { he: "בד שחור", en: "Black fabric" }, hex: "#222222" },
  portobello: { id: "portobello-leather", name: { he: "פורטובלו", en: "Portobello leather" }, hex: "#6b5344" },
  nightshadeBlack: { id: "nightshade-black", name: { he: "נייטשייד שחור", en: "Nightshade black" }, hex: "#111111" },
  grayUltrasuede: { id: "gray-ultrasuede", name: { he: "אולטרסוויד אפור", en: "Gray Ultrasuede" }, hex: "#9a9b98" },
  platUltra: { id: "platinum-ultrasuede", name: { he: "אולטרסוויד פלטינום", en: "Platinum Ultrasuede" }, hex: "#b7b6b1" },
  ghGrayLeather: { id: "gray-leather", name: { he: "עור אפור", en: "Gray leather" }, hex: "#8e8f8a" },
  blackCloth: { id: "black-cloth", name: { he: "בד שחור", en: "Black cloth" }, hex: "#1a1a1a" },
  hBlackLeather: { id: "black-leather", name: { he: "עור שחור", en: "Black leather" }, hex: "#161616" },
  hGrayLeather: { id: "gray-leather", name: { he: "עור אפור", en: "Gray leather" }, hex: "#8a8b88" },
  trailBlack: { id: "trailsport-black", name: { he: "TrailSport שחור", en: "TrailSport black" }, hex: "#1a1a1a" },
  hBlackPerf: { id: "black-perforated", name: { he: "עור שחור מחורר", en: "Black perforated leather" }, hex: "#1a1a1a" },
};

function toyota(
  slug: string,
  name: Text,
  tagline: Text,
  description: Text,
  body: Car["body"],
  seats: number,
  extra: Partial<Car> & { trims: TrimLevel[]; colors: Paint[]; interiors: Interior[]; specs: Spec[]; highlights: Text[] },
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
    defaultInterior: extra.defaultInterior ?? extra.interiors[0]?.id ?? "black-softex",
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
      defaultTrim: "se",
      defaultColor: "wind-chill",
      defaultInterior: "black-softex",
      colors: [
        P.white,
        P.black,
        P.red,
        P.under,
        P.metal,
        P.wind,
        P.ocean,
        P.cosmos,
        P.metalRoof,
        P.oceanRoof,
        P.windRoof,
      ],
      interiors: [I.boulder, I.blackSoftex, I.grayLeather, I.cockpit],
      trims: [
        {
          id: "se",
          name: { he: "SE FWD", en: "SE FWD" },
          blurb: { he: "מתלים ספורטיביים, גלגלי 18״ וסופטקס.", en: "Sport-tuned suspension, 18\" wheels and SofTex." },
          colors: ["ice-cap", "midnight-black", "supersonic-red", "underground", "wind-chill"],
          interiors: ["black-softex", "boulder-fabric"],
          distinctExterior: true,
        },
        {
          id: "se-upgrade",
          name: { he: "SE אפגרייד FWD", en: "SE Upgrade FWD" },
          blurb: { he: "גלגלי 18״, גג נפתח ו־Smart Key.", en: "18\" wheels, moonroof and Smart Key." },
          colors: ["ice-cap", "midnight-black", "supersonic-red", "underground", "heavy-metal"],
          interiors: ["black-softex"],
          distinctExterior: true,
        },
        {
          id: "se-upgrade-awd",
          name: { he: "SE אפגרייד AWD", en: "SE Upgrade AWD" },
          blurb: { he: "הנעה כפולה עם ציוד ה־SE Upgrade.", en: "All-wheel drive with the SE Upgrade kit." },
          colors: ["ice-cap", "midnight-black", "supersonic-red", "underground", "heavy-metal"],
          interiors: ["black-softex"],
          distinctExterior: true,
        },
        {
          id: "nightshade",
          name: { he: "Nightshade", en: "Nightshade" },
          blurb: { he: "חבילת שחור חיצונית, גלגלי 19״ ופנים שחור בלבד.", en: "Blacked-out exterior, 19\" wheels, black interior only." },
          colors: ["ice-cap", "midnight-black", "supersonic-red"],
          interiors: ["black-softex"],
          distinctExterior: true,
        },
        {
          id: "xle",
          name: { he: "XLE AWD", en: "XLE AWD" },
          blurb: { he: "עור ו־Dinamica, מסך 12.3״.", en: "Leather and Dinamica, 12.3\" screen." },
          colors: ["dark-cosmos", "heavy-metal", "midnight-black", "ocean-gem", "wind-chill"],
          interiors: ["light-gray-leather"],
          distinctExterior: true,
        },
        {
          id: "xse",
          name: { he: "XSE AWD", en: "XSE AWD" },
          blurb: { he: "גלגלי 19״, שני גוונים ופנים Cockpit Red.", en: "19\" wheels, two-tone paint and Cockpit Red interior." },
          colors: [
            "heavy-metal",
            "heavy-metal-black-roof",
            "midnight-black",
            "ocean-gem-black-roof",
            "supersonic-red",
            "underground",
            "wind-chill",
            "wind-chill-black-roof",
          ],
          interiors: ["cockpit-red"],
          distinctExterior: true,
        },
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
      defaultInterior: "black-leather",
      colors: [P.storm, P.cypress, P.black, P.silver, P.wind, P.ruby, P.metal, P.cement, P.blue],
      interiors: [I.blackFabric, I.blackSoftex, I.blackLeather, I.ghGrayLeather, I.portobello, I.nightshadeBlack, I.grayUltrasuede, I.platUltra],
      trims: [
        {
          id: "le",
          name: { he: "LE", en: "LE" },
          blurb: { he: "שלושה טורים עם בד שחור.", en: "Three rows with black fabric." },
          colors: ["storm-cloud", "cypress", "midnight-black", "celestial-silver", "wind-chill", "heavy-metal", "cement", "blueprint"],
          interiors: ["black-fabric"],
        },
        {
          id: "xle",
          name: { he: "XLE", en: "XLE" },
          blurb: { he: "שלושה טורים וסופטקס שחור או אפור.", en: "Three rows and black or gray SofTex." },
          colors: ["storm-cloud", "cypress", "midnight-black", "celestial-silver", "wind-chill", "heavy-metal", "cement", "blueprint"],
          interiors: ["black-softex"],
        },
        {
          id: "limited",
          name: { he: "Limited", en: "Limited" },
          blurb: { he: "גלגלי 20״ ועור.", en: "20\" wheels and leather." },
          colors: ["storm-cloud", "cypress", "midnight-black", "celestial-silver", "wind-chill", "ruby-flare", "heavy-metal"],
          interiors: ["black-leather", "gray-leather"],
          distinctExterior: true,
        },
        {
          id: "platinum",
          name: { he: "Platinum", en: "Platinum" },
          blurb: { he: "קצה הפרימיום, כולל Portobello.", en: "Top of the range, including Portobello." },
          colors: ["storm-cloud", "midnight-black", "wind-chill", "ruby-flare", "heavy-metal"],
          interiors: ["portobello-leather", "platinum-ultrasuede", "gray-ultrasuede"],
          distinctExterior: true,
        },
        {
          id: "hybridnightshade",
          name: { he: "Nightshade", en: "Nightshade" },
          blurb: { he: "שחור מבחוץ, עור שחור מבפנים.", en: "Blacked-out exterior, black leather cabin." },
          colors: ["storm-cloud", "midnight-black", "cement"],
          interiors: ["nightshade-black"],
          distinctExterior: true,
        },
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
      defaultInterior: "moonstone-softex",
      colors: [P.wood, P.ice, P.black, P.cypress, P.blue, P.wind, P.metal, P.cement, P.ruby],
      interiors: [I.grayFabric, I.graySoftex, I.moonstone, I.blackSoftex, I.blackLeather, I.macadamia],
      trims: [
        {
          id: "le",
          name: { he: "LE", en: "LE" },
          blurb: { he: "בסיס משפחתי היברידי עם בד אפור.", en: "Hybrid family base with gray fabric." },
          colors: ["ice-cap", "midnight-black", "cypress", "blueprint", "wind-chill", "heavy-metal", "cement"],
          interiors: ["gray-fabric"],
        },
        {
          id: "xle",
          name: { he: "XLE", en: "XLE" },
          blurb: { he: "סופטקס אפור ונוחות משפחתית.", en: "Gray SofTex and family comfort." },
          colors: ["ice-cap", "midnight-black", "cypress", "blueprint", "wind-chill", "heavy-metal"],
          interiors: ["gray-softex"],
        },
        {
          id: "xse",
          name: { he: "XSE", en: "XSE" },
          blurb: { he: "עיצוב ספורטיבי וסופטקס Moonstone.", en: "Sportier look and Moonstone SofTex." },
          colors: ["ice-cap", "midnight-black", "cypress", "blueprint", "wind-chill", "heavy-metal", "ruby-flare"],
          interiors: ["moonstone-softex"],
          distinctExterior: true,
        },
        {
          id: "woodland",
          name: { he: "Woodland", en: "Woodland" },
          blurb: { he: "גחון מוגן, צמיגי שטח ופנים שחור.", en: "Skid plate, all-terrain tires and black SofTex." },
          colors: ["woodland", "ice-cap", "midnight-black", "cypress", "cement"],
          interiors: ["black-softex"],
          distinctExterior: true,
        },
        {
          id: "limited",
          name: { he: "Limited", en: "Limited" },
          blurb: { he: "עור שחור ומסך גדול.", en: "Black leather and the large screen." },
          colors: ["ice-cap", "midnight-black", "cypress", "blueprint", "wind-chill", "heavy-metal"],
          interiors: ["black-leather"],
          distinctExterior: true,
        },
        {
          id: "platinum",
          name: { he: "Platinum", en: "Platinum" },
          blurb: { he: "קצה הגימור, עור מקדמיה.", en: "Top trim, Macadamia leather." },
          colors: ["ice-cap", "midnight-black", "cypress", "blueprint", "wind-chill"],
          interiors: ["macadamia-leather"],
          distinctExterior: true,
        },
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
      defaultInterior: "black-softex",
      colors: [P.wave, P.ice, P.black, P.under, P.heritage, P.everest, P.cutting, P.red, P.wind],
      interiors: [I.blackFabric, I.blackSoftex, I.cockpit],
      trims: [
        {
          id: "sr5",
          name: { he: "SR5", en: "SR5" },
          blurb: { he: "בסיס שטח עם בד שחור.", en: "Off-road base with black fabric." },
          colors: ["ice-cap", "midnight-black", "underground", "heritage-blue", "cutting-edge", "supersonic-red", "wind-chill"],
          interiors: ["black-softex"],
        },
        {
          id: "trd-pro",
          name: { he: "TRD Pro", en: "TRD Pro" },
          blurb: { he: "קצה השטח. Wave Maker רק עם פנים שחור.", en: "Toyota's off-road peak. Wave Maker with black interior only." },
          colors: ["wave-maker", "ice-cap", "midnight-black", "underground", "wind-chill"],
          interiors: ["black-softex"],
          distinctExterior: true,
        },
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
      defaultTrim: "xse",
      defaultColor: "midnight-black",
      defaultInterior: "black-blue-softex",
      colors: [P.black, P.blue, P.metal, P.ice, P.silver, P.wind, P.wood],
      interiors: [
        { id: "black-blue-fabric", name: { he: "בד שחור/כחול", en: "Black/Blue fabric" }, hex: "#1a1e28" },
        { id: "mineral-softex", name: { he: "סופטקס מינרל", en: "Mineral SofTex" }, hex: "#6b6e66" },
        { id: "black-blue-softex", name: { he: "סופטקס שחור/כחול", en: "Black/Blue SofTex" }, hex: "#1c222c" },
        { id: "black-red-ultrasuede", name: { he: "אולטרסוויד שחור/אדום", en: "Black/Red Ultrasuede" }, hex: "#2a1518" },
      ],
      trims: [
        {
          id: "se",
          name: { he: "SE", en: "SE" },
          blurb: { he: "פלאג־אין ספורטיבי עם בד שחור/כחול.", en: "Sporty plug-in with black/blue fabric." },
          colors: ["midnight-black", "blueprint", "heavy-metal", "ice-cap"],
          interiors: ["black-blue-fabric"],
        },
        {
          id: "woodland",
          name: { he: "Woodland", en: "Woodland" },
          blurb: { he: "שטח קל וסופטקס Mineral.", en: "Light off-road and Mineral SofTex." },
          colors: ["midnight-black", "heavy-metal", "ice-cap", "woodland", "wind-chill"],
          interiors: ["mineral-softex"],
          distinctExterior: true,
        },
        {
          id: "xse",
          name: { he: "XSE", en: "XSE" },
          blurb: { he: "גימור גבוה, סופטקס שחור/כחול.", en: "Higher trim, black/blue SofTex." },
          colors: ["midnight-black", "blueprint", "heavy-metal", "ice-cap", "wind-chill"],
          interiors: ["black-blue-softex"],
          distinctExterior: true,
        },
        {
          id: "gr-sport",
          name: { he: "GR Sport", en: "GR Sport" },
          blurb: { he: "GR, אולטרסוויד שחור/אדום.", en: "GR, black/red Ultrasuede." },
          colors: ["midnight-black", "blueprint", "heavy-metal"],
          interiors: ["black-red-ultrasuede"],
          distinctExterior: true,
        },
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
      defaultInterior: "black-fabric",
      colors: [P.meteor, P.trail, P.iceberg, P.ice, P.sand, P.wind, P.under, P.heritage],
      interiors: [I.blackFabric, I.blackSoftex],
      trims: [
        {
          id: "1958",
          name: { he: "1958", en: "1958" },
          blurb: { he: "עיצוב מורשת.", en: "Heritage look." },
          colors: ["meteor", "trail-dust", "iceberg", "wind-chill"],
          interiors: ["black-fabric"],
          distinctExterior: true,
        },
        {
          id: "land-cruiser",
          name: { he: "Land Cruiser", en: "Land Cruiser" },
          blurb: { he: "גימור מלא.", en: "Full trim." },
          colors: ["meteor", "trail-dust", "iceberg", "ice-cap", "wind-chill", "underground", "heritage-blue"],
          interiors: ["black-softex"],
        },
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
      defaultInterior: "black-leather",
      colors: [P.red, P.ice, P.black, P.silver, P.cypress, P.blue, P.magnetic, P.wind],
      interiors: [I.blackSoftex, I.blackLeather, I.ghGrayLeather],
      trims: [
        {
          id: "sr5",
          name: { he: "SR5", en: "SR5" },
          blurb: { he: "בסיס משפחתי גדול.", en: "Big family base." },
          colors: ["ice-cap", "midnight-black", "celestial-silver", "magnetic-gray", "cypress", "blueprint", "wind-chill"],
          interiors: ["black-leather"],
        },
        {
          id: "capstone",
          name: { he: "Capstone", en: "Capstone" },
          blurb: { he: "פרימיום מלא עם עור.", en: "Full premium with leather." },
          colors: ["supersonic-red", "ice-cap", "midnight-black", "celestial-silver", "cypress", "blueprint", "wind-chill"],
          interiors: ["black-leather", "gray-leather"],
          distinctExterior: true,
        },
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
    defaultInterior: "black-leather",
    colors: [P.hWhite, P.hBlack, P.hRadiant2, P.hSilver, P.hSteel, P.hSonic, P.hSmoke],
    interiors: [I.hBlackLeather, I.hGrayLeather],
    trims: [
      {
        id: "ex-l",
        name: { he: "EX-L", en: "EX-L" },
        blurb: { he: "משפחתי מצויד, עור שחור או אפור.", en: "Well-equipped family, black or gray leather." },
        colors: ["crystal-black-pearl", "modern-steel-metallic", "platinum-white-pearl", "solar-silver-metallic", "smoke-blue-pearl", "radiant-red-metallic-ii"],
        interiors: ["black-leather", "gray-leather"],
      },
      {
        id: "sport-l",
        name: { he: "Sport-L", en: "Sport-L" },
        blurb: { he: "גלגלים שחורים ופנים שחור עם תפר אדום.", en: "Black wheels and black leather with red stitch." },
        colors: ["crystal-black-pearl", "platinum-white-pearl", "radiant-red-metallic-ii", "sonic-grey-pearl"],
        interiors: ["black-leather"],
        distinctExterior: true,
      },
      {
        id: "touring",
        name: { he: "Touring", en: "Touring" },
        blurb: { he: "קצה הנוחות.", en: "Comfort peak." },
        colors: ["crystal-black-pearl", "modern-steel-metallic", "platinum-white-pearl", "solar-silver-metallic", "sonic-grey-pearl", "smoke-blue-pearl", "radiant-red-metallic-ii"],
        interiors: ["black-leather", "gray-leather"],
      },
      {
        id: "elite",
        name: { he: "Elite", en: "Elite" },
        blurb: { he: "גימור מלא.", en: "Fully loaded." },
        colors: ["crystal-black-pearl", "modern-steel-metallic", "platinum-white-pearl", "solar-silver-metallic", "sonic-grey-pearl"],
        interiors: ["black-leather"],
        distinctExterior: true,
      },
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
    defaultInterior: "black-cloth",
    colors: [P.hRadiant, P.hWhite, P.hBlack, P.hSilver, P.hGray, P.hCanyon, P.hMeteor, P.hNight, P.hAsh],
    interiors: [I.blackCloth, I.hBlackLeather, I.hGrayLeather, I.trailBlack],
    trims: [
      {
        id: "ex-l",
        name: { he: "EX-L", en: "EX-L" },
        blurb: { he: "נוחות יומיומית ועור.", en: "Everyday comfort and leather." },
        colors: ["crystal-black-pearl", "meteoroid-grey-metallic", "solar-silver-metallic", "platinum-white-pearl", "radiant-red-metallic", "urban-grey-pearl", "canyon-river-blue-metallic"],
        interiors: ["black-leather", "gray-leather"],
      },
      {
        id: "sport-hybrid",
        name: { he: "Sport Hybrid", en: "Sport Hybrid" },
        blurb: { he: "היבריד AWD עם בד שחור.", en: "Hybrid AWD with black cloth." },
        colors: ["crystal-black-pearl", "meteoroid-grey-metallic", "solar-silver-metallic", "platinum-white-pearl", "radiant-red-metallic", "urban-grey-pearl", "canyon-river-blue-metallic", "still-night-pearl"],
        interiors: ["black-cloth"],
      },
      {
        id: "trailsport-hybrid",
        name: { he: "TrailSport Hybrid", en: "TrailSport Hybrid" },
        blurb: { he: "שטח קל, Ash Green ופנים TrailSport.", en: "Light off-road, Ash Green and TrailSport cabin." },
        colors: ["ash-green-metallic", "canyon-river-blue-metallic", "crystal-black-pearl", "platinum-white-pearl", "radiant-red-metallic", "urban-grey-pearl"],
        interiors: ["trailsport-black"],
        distinctExterior: true,
      },
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
    defaultInterior: "black-leather",
    colors: [P.hRadiant, P.hWhite, P.hBlack, P.hSilver, P.hGray, P.hCanyon, P.hMeteor, P.hNight],
    interiors: [I.hBlackLeather, I.hGrayLeather],
    trims: [
      {
        id: "sport-hybrid",
        name: { he: "Sport Hybrid", en: "Sport Hybrid" },
        blurb: { he: "היבריד ספורטיבי, עור שחור.", en: "Sporty hybrid, black leather." },
        colors: ["crystal-black-pearl", "solar-silver-metallic", "meteoroid-grey-metallic", "canyon-river-blue-metallic", "platinum-white-pearl", "urban-grey-pearl", "radiant-red-metallic"],
        interiors: ["black-leather"],
      },
      {
        id: "touring-hybrid",
        name: { he: "Touring Hybrid", en: "Touring Hybrid" },
        blurb: { he: "קצה הגימור, שחור או אפור לפי הצבע.", en: "Top trim, black or gray depending on paint." },
        colors: ["crystal-black-pearl", "solar-silver-metallic", "meteoroid-grey-metallic", "platinum-white-pearl", "urban-grey-pearl", "radiant-red-metallic", "still-night-pearl"],
        interiors: ["black-leather", "gray-leather"],
        distinctExterior: true,
      },
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
    defaultInterior: "black-perforated",
    colors: [P.hAsh, P.hWhite, P.hBlack, P.hSilver, P.hSteel, P.hSonic, P.hRadiant2, P.hSmoke],
    interiors: [I.hBlackPerf, I.hBlackLeather, I.trailBlack],
    trims: [
      {
        id: "sport",
        name: { he: "Sport", en: "Sport" },
        blurb: { he: "שלושה טורים יומיומי.", en: "Everyday three-row." },
        colors: ["crystal-black-pearl", "solar-silver-metallic", "platinum-white-pearl", "radiant-red-metallic-ii", "sonic-grey-pearl"],
        interiors: ["black-perforated"],
      },
      {
        id: "trailsport",
        name: { he: "TrailSport", en: "TrailSport" },
        blurb: { he: "שטח קל. Ash Green בלעדי.", en: "Light off-road. Exclusive Ash Green." },
        colors: ["ash-green-metallic", "smoke-blue-pearl", "crystal-black-pearl", "solar-silver-metallic"],
        interiors: ["black-perforated"],
        distinctExterior: true,
      },
      {
        id: "elite",
        name: { he: "Elite", en: "Elite" },
        blurb: { he: "קצה הפרימיום, עור מחורר.", en: "Premium peak, perforated leather." },
        colors: ["crystal-black-pearl", "platinum-white-pearl", "sonic-grey-pearl", "solar-silver-metallic", "modern-steel-metallic"],
        interiors: ["black-perforated"],
        distinctExterior: true,
      },
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
export function interiorsForTrim(car: Car, trimId: string): Interior[] {
  const trim = car.trims.find((t) => t.id === trimId);
  if (!trim?.interiors?.length) return car.interiors;
  return car.interiors.filter((c) => trim.interiors!.includes(c.id));
}
export function carImage(car: Car) {
  return catalogSrc(car.slug, car.defaultColor, car.defaultTrim) || `${import.meta.env.BASE_URL}cars/fallback.svg`;
}

