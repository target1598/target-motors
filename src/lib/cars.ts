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
  oxygen: { id: "oxygen-white", name: { he: "אוקסיגן וייט", en: "Oxygen White" }, hex: "#f4f5f0" },
  finish: { id: "finish-line-red", name: { he: "פיניש ליין רד", en: "Finish Line Red" }, hex: "#9b1b24" },
  ink: { id: "ink", name: { he: "אינק", en: "Ink" }, hex: "#0e0e10" },
  brown: { id: "brown-sugar", name: { he: "בראון שוגר", en: "Brown Sugar Metallic" }, hex: "#6e4f32" },
  heritageRoof: { id: "heritage-blue-grey-roof", name: { he: "הריטג׳ בלו · גג אפור", en: "Heritage Blue with Light Grey Roof" }, hex: "#2c4c6e" },
  trailRoof: { id: "trail-dust-grey-roof", name: { he: "טרייל דאסט · גג אפור", en: "Trail Dust with Light Grey Roof" }, hex: "#9a947c" },
  guardian: { id: "guardian-gray", name: { he: "גארדיאן גריי", en: "Guardian Gray" }, hex: "#6a6c6e" },
  yellow: { id: "maximum-yellow", name: { he: "מקסימום ילו", en: "Maximum Yellow" }, hex: "#d6b400" },
  mudbath: { id: "mudbath", name: { he: "מאדבאת׳", en: "Mudbath" }, hex: "#6b5a3a" },
  stormRoof: { id: "storm-cloud-black-roof", name: { he: "סטורם קלאוד · גג שחור", en: "Storm Cloud with Black Roof" }, hex: "#5c5e62" },
  redRoof: { id: "supersonic-red-black-roof", name: { he: "סופרסוניק רד · גג שחור", en: "Supersonic Red with Black Roof" }, hex: "#b5121b" },
  brownRoof: { id: "brown-sugar-black-roof", name: { he: "בראון שוגר · גג שחור", en: "Brown Sugar Metallic with Black Roof" }, hex: "#6e4f32" },
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
      he: "קאמרי 2026 היברידית בלבד. חמישה מקומות, Toyota Safety Sense, וגימורים מ־SE עד XSE ו־Nightshade — רק הצבעים שיש להם תמונות בתיקייה.",
      en: "2026 Camry is hybrid-only. Five seats, Toyota Safety Sense, trims from SE through XSE and Nightshade — only paints that exist in the photo folder.",
    },
    "sedan",
    5,
    {
      hybrid: true,
      defaultTrim: "se",
      defaultColor: "ice-cap",
      defaultInterior: "black-softex",
      colors: [P.white, P.black, P.red, P.under, P.metal, P.wind, P.ocean, P.cosmos, P.metalRoof, P.oceanRoof, P.windRoof],
      interiors: [I.boulder, I.blackSoftex, I.grayLeather, I.cockpit],
      trims: [
        { id: "se", name: { he: "SE FWD", en: "SE FWD" }, blurb: { he: "מתלים ספורטיביים וגלגלי 18״.", en: "Sport-tuned suspension and 18\" wheels." }, colors: ["ice-cap", "midnight-black", "supersonic-red", "underground"], interiors: ["black-softex", "boulder-fabric"], distinctExterior: true },
        { id: "se-upgrade", name: { he: "SE אפגרייד FWD", en: "SE Upgrade FWD" }, blurb: { he: "גג נפתח ו־Smart Key.", en: "Moonroof and Smart Key." }, colors: ["ice-cap", "midnight-black", "supersonic-red", "underground", "heavy-metal"], interiors: ["black-softex"], distinctExterior: true },
        { id: "se-upgrade-awd", name: { he: "SE אפגרייד AWD", en: "SE Upgrade AWD" }, blurb: { he: "הנעה כפולה עם ציוד ה־Upgrade.", en: "All-wheel drive with the Upgrade kit." }, colors: ["ice-cap", "midnight-black", "supersonic-red", "underground", "heavy-metal"], interiors: ["black-softex"], distinctExterior: true },
        { id: "nightshade", name: { he: "Nightshade", en: "Nightshade" }, blurb: { he: "חבילת שחור, גלגלי 19״.", en: "Blacked-out exterior, 19\" wheels." }, colors: ["ice-cap", "midnight-black", "supersonic-red"], interiors: ["black-softex"], distinctExterior: true },
        { id: "xle", name: { he: "XLE AWD", en: "XLE AWD" }, blurb: { he: "עור ו־Dinamica, מסך 12.3״.", en: "Leather and Dinamica, 12.3\" screen." }, colors: ["dark-cosmos", "heavy-metal", "midnight-black", "ocean-gem", "wind-chill"], interiors: ["light-gray-leather"], distinctExterior: true },
        { id: "xse", name: { he: "XSE AWD", en: "XSE AWD" }, blurb: { he: "גלגלי 19״ ושני גוונים.", en: "19\" wheels and two-tone paint." }, colors: ["heavy-metal", "heavy-metal-black-roof", "midnight-black", "ocean-gem-black-roof", "supersonic-red", "underground", "wind-chill", "wind-chill-black-roof"], interiors: ["cockpit-red"], distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית · FWD / AWD", en: "Hybrid · FWD / AWD" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      ],
      highlights: [
        { he: "היברידית בכל הגימורים", en: "Hybrid across every trim" },
        { he: "צבע לפי התיקייה בלבד", en: "Colours only where photos exist" },
      ],
    },
  ),
  toyota(
    "crown",
    { he: "טויוטה קראון", en: "Toyota Crown" },
    { he: "סדאן היברידית גבוהה ונועזת", en: "A raised, bold hybrid sedan" },
    {
      he: "קראון 2026 בקנדה בגימורי Limited ו־Platinum. היבריד עם AWD אלקטרוני, ו־HYBRID MAX בפלטינום. Finish Line Red רק בפלטינום.",
      en: "2026 Crown in Canada in Limited and Platinum. Hybrid with electronic AWD, HYBRID MAX on Platinum. Finish Line Red is Platinum-only.",
    },
    "sedan",
    5,
    {
      hybrid: true,
      defaultTrim: "limited",
      defaultColor: "oxygen-white",
      defaultInterior: "black-leather",
      colors: [P.oxygen, P.black, P.metal, P.finish],
      interiors: [I.blackLeather],
      trims: [
        { id: "limited", name: { he: "Limited", en: "Limited" }, blurb: { he: "היבריד 2.5L, גלגלי 19״ ועור שחור.", en: "2.5L hybrid, 19\" wheels and black leather." }, colors: ["oxygen-white", "midnight-black", "heavy-metal"], interiors: ["black-leather"], hybrid: true, distinctExterior: true },
        { id: "platinum", name: { he: "Platinum", en: "Platinum" }, blurb: { he: "HYBRID MAX, גלגלי 21״ ו־Finish Line Red.", en: "HYBRID MAX, 21\" wheels and Finish Line Red." }, colors: ["oxygen-white", "midnight-black", "heavy-metal", "finish-line-red"], interiors: ["black-leather"], hybrid: true, distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היבריד / HYBRID MAX · AWD", en: "Hybrid / HYBRID MAX · AWD" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      ],
      highlights: [
        { he: "סדאן גבוהה", en: "Raised sedan stance" },
        { he: "Finish Line Red בפלטינום", en: "Finish Line Red on Platinum" },
      ],
    },
  ),
  toyota(
    "prius-phev",
    { he: "טויוטה פריוס פלאג־אין", en: "Toyota Prius Plug-in Hybrid" },
    { he: "פלאג־אין חד וחסכוני לשנת 2027", en: "A sharp 2027 plug-in hybrid" },
    {
      he: "פריוס PHEV 2027 — עד כ־44 מייל חשמליים, AWD, צבע Ink החדש, ומקסימום ילו רק ב־XSE Premium.",
      en: "2027 Prius PHEV — up to about 44 electric miles, AWD, new Ink paint, and Maximum Yellow only on XSE Premium.",
    },
    "sedan",
    5,
    {
      year: 2027,
      hybrid: true,
      plugin: true,
      defaultTrim: "se",
      defaultColor: "wind-chill",
      defaultInterior: "black-softex",
      colors: [P.wind, P.ink, P.cutting, P.red, P.guardian, P.reservoir, P.yellow],
      interiors: [I.blackSoftex],
      trims: [
        { id: "se", name: { he: "SE", en: "SE" }, blurb: { he: "פלאג־אין בסיס, עד 51 mpg משולב.", en: "Base plug-in, up to 51 mpg combined." }, colors: ["wind-chill", "ink", "cutting-edge", "supersonic-red", "guardian-gray"], interiors: ["black-softex"], plugin: true, distinctExterior: true },
        { id: "xse", name: { he: "XSE", en: "XSE" }, blurb: { he: "גלגלי 19״ וסופטקס. Reservoir Blue זמין כאן.", en: "19\" wheels and SofTex. Reservoir Blue is available here." }, colors: ["wind-chill", "ink", "cutting-edge", "supersonic-red", "reservoir-blue", "guardian-gray"], interiors: ["black-softex"], plugin: true, distinctExterior: true },
        { id: "xse-premium", name: { he: "XSE Premium", en: "XSE Premium" }, blurb: { he: "גג זכוכית, JBL ומקסימום ילו.", en: "Glass roof, JBL and Maximum Yellow." }, colors: ["wind-chill", "ink", "cutting-edge", "maximum-yellow", "supersonic-red", "reservoir-blue", "guardian-gray"], interiors: ["black-softex"], plugin: true, distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "פלאג־אין הייבריד AWD", en: "Plug-in hybrid AWD" } },
        { label: { he: "טווח חשמלי", en: "EV range" }, value: { he: "עד 44 מייל", en: "Up to 44 miles" } },
      ],
      highlights: [
        { he: "טעינה מהשקע בבית", en: "Charge at home" },
        { he: "Ink ו־Maximum Yellow לפי גימור", en: "Ink and Maximum Yellow by trim" },
      ],
    },
  ),
  toyota(
    "grand-highlander",
    { he: "טויוטה גרנד היילנדר", en: "Toyota Grand Highlander" },
    { he: "שלושה טורים למשפחה הגדולה", en: "Three rows for a large family" },
    {
      he: "גרנד היילנדר 2026 — בנזין והיבריד לפי התיקייה. Limited 7 או 8 מקומות, ו־Platinum Hybrid MAX בקצה.",
      en: "2026 Grand Highlander — gas and hybrid exactly as in the photo folder. Limited in 7 or 8 seats, Platinum Hybrid MAX at the top.",
    },
    "suv",
    8,
    {
      hybrid: true,
      defaultTrim: "xle",
      defaultColor: "wind-chill",
      defaultInterior: "black-softex",
      colors: [P.silver, P.wind, P.black, P.blue, P.metal, P.storm, P.ruby, P.cement],
      interiors: [I.blackSoftex, I.blackLeather, I.ghGrayLeather, I.portobello, I.platUltra],
      trims: [
        { id: "xle", name: { he: "XLE", en: "XLE" }, blurb: { he: "שלושה טורים, סופטקס.", en: "Three rows, SofTex." }, colors: ["celestial-silver", "wind-chill", "midnight-black", "blueprint"], interiors: ["black-softex"], hybrid: false, distinctExterior: true },
        { id: "limited", name: { he: "Limited", en: "Limited" }, blurb: { he: "גלגלי 20״ ועור.", en: "20\" wheels and leather." }, colors: ["wind-chill", "midnight-black", "heavy-metal", "blueprint", "storm-cloud", "ruby-flare"], interiors: ["black-leather", "gray-leather"], hybrid: false, distinctExterior: true },
        { id: "hybrid-xle", name: { he: "Hybrid XLE", en: "Hybrid XLE" }, blurb: { he: "היבריד חסכוני, אותם צבעי XLE.", en: "Efficient hybrid, same colours as gas XLE." }, colors: ["celestial-silver", "wind-chill", "midnight-black", "blueprint"], interiors: ["black-softex"], hybrid: true, distinctExterior: true },
        { id: "hybrid-limited-7", name: { he: "Hybrid Limited 7", en: "Hybrid Limited 7-Pass" }, blurb: { he: "היבריד, שבעה מקומות.", en: "Hybrid, seven seats." }, colors: ["wind-chill", "midnight-black", "heavy-metal", "blueprint", "storm-cloud", "ruby-flare"], interiors: ["black-leather"], hybrid: true, seats: 7, distinctExterior: true },
        { id: "hybrid-limited-8", name: { he: "Hybrid Limited 8", en: "Hybrid Limited 8-Pass" }, blurb: { he: "היבריד, שמונה מקומות.", en: "Hybrid, eight seats." }, colors: ["wind-chill", "midnight-black", "heavy-metal", "blueprint", "storm-cloud", "ruby-flare"], interiors: ["black-leather"], hybrid: true, seats: 8, distinctExterior: true },
        { id: "platinum", name: { he: "Platinum Hybrid MAX", en: "Platinum Hybrid MAX" }, blurb: { he: "Hybrid MAX וצבע Cement.", en: "Hybrid MAX and Cement paint." }, colors: ["wind-chill", "midnight-black", "cement", "heavy-metal", "blueprint", "storm-cloud", "ruby-flare"], interiors: ["portobello-leather", "platinum-ultrasuede"], hybrid: true, distinctExterior: true },
      ],
      specs: [
        { label: { he: "מושבים", en: "Seats" }, value: { he: "7 או 8", en: "7 or 8" } },
        { label: { he: "טורים", en: "Rows" }, value: { he: "3", en: "3" } },
      ],
      highlights: [
        { he: "שורה שלישית שמישה", en: "Usable third row" },
        { he: "Hybrid MAX בפלטינום", en: "Hybrid MAX on Platinum" },
      ],
    },
  ),
  toyota(
    "sienna",
    { he: "טויוטה סיינה הייבריד", en: "Toyota Sienna Hybrid" },
    { he: "מיניוואן היברידי עם דלתות הזזה", en: "Hybrid minivan with sliding doors" },
    {
      he: "סיינה 2026 היברידית בלבד. FWD ו־AWD, גרסאות Mobility ו־Technology — רק מה שיש בתיקייה.",
      en: "2026 Sienna is hybrid-only. FWD and AWD, Mobility and Technology grades — only what is in the photo folder.",
    },
    "minivan",
    8,
    {
      hybrid: true,
      defaultTrim: "xse-awd",
      defaultColor: "ice-cap",
      defaultInterior: "moonstone-softex",
      colors: [P.white, P.black, P.metal, P.wind, P.blue, P.ruby, P.cement],
      interiors: [I.grayFabric, I.graySoftex, I.moonstone, I.blackSoftex, I.blackLeather, I.macadamia],
      trims: [
        { id: "le-fwd", name: { he: "LE FWD 8", en: "LE FWD 8-Pass" }, blurb: { he: "בסיס משפחתי, שמונה מקומות.", en: "Family base, eight seats." }, colors: ["midnight-black", "heavy-metal", "ice-cap"], interiors: ["gray-fabric"], seats: 8, distinctExterior: true },
        { id: "le-awd", name: { he: "LE AWD 8", en: "LE AWD 8-Pass" }, blurb: { he: "הנעה כפולה, שמונה מקומות.", en: "All-wheel drive, eight seats." }, colors: ["midnight-black", "heavy-metal", "ice-cap"], interiors: ["gray-fabric"], seats: 8, distinctExterior: true },
        { id: "le-fwd-mobility", name: { he: "LE FWD Mobility", en: "LE FWD Mobility" }, blurb: { he: "גרסת נגישות FWD.", en: "FWD mobility conversion." }, colors: ["midnight-black", "ice-cap"], interiors: ["gray-fabric"], seats: 8, distinctExterior: true },
        { id: "le-awd-mobility", name: { he: "LE AWD Mobility", en: "LE AWD Mobility" }, blurb: { he: "גרסת נגישות AWD.", en: "AWD mobility conversion." }, colors: ["midnight-black", "ice-cap"], interiors: ["gray-fabric"], seats: 8, distinctExterior: true },
        { id: "xle", name: { he: "XLE FWD 8", en: "XLE FWD 8-Pass" }, blurb: { he: "סופטקס ונוחות משפחתית.", en: "SofTex and family comfort." }, colors: ["wind-chill", "midnight-black", "heavy-metal", "blueprint"], interiors: ["gray-softex"], seats: 8, distinctExterior: true },
        { id: "xle-mobility", name: { he: "XLE Mobility", en: "XLE Mobility" }, blurb: { he: "XLE נגישות. בלי Heavy Metal.", en: "XLE mobility. No Heavy Metal." }, colors: ["wind-chill", "midnight-black", "blueprint"], interiors: ["gray-softex"], seats: 8, distinctExterior: true },
        { id: "xse-fwd", name: { he: "XSE FWD 7", en: "XSE FWD 7-Pass" }, blurb: { he: "עיצוב ספורטיבי, שבעה מקומות.", en: "Sportier look, seven seats." }, colors: ["midnight-black", "cement", "heavy-metal", "blueprint", "ice-cap", "ruby-flare"], interiors: ["moonstone-softex"], seats: 7, distinctExterior: true },
        { id: "xse-awd", name: { he: "XSE AWD 7", en: "XSE AWD 7-Pass" }, blurb: { he: "XSE עם הנעה כפולה.", en: "XSE with all-wheel drive." }, colors: ["midnight-black", "cement", "heavy-metal", "blueprint", "ice-cap", "ruby-flare"], interiors: ["moonstone-softex"], seats: 7, distinctExterior: true },
        { id: "xse-tech", name: { he: "XSE Technology", en: "XSE Technology" }, blurb: { he: "חבילת טכנולוגיה על XSE AWD.", en: "Technology package on XSE AWD." }, colors: ["midnight-black", "cement", "heavy-metal", "blueprint", "ice-cap", "ruby-flare"], interiors: ["moonstone-softex"], seats: 7, distinctExterior: true },
        { id: "xse-mobility", name: { he: "XSE Mobility", en: "XSE Mobility" }, blurb: { he: "XSE נגישות.", en: "XSE mobility conversion." }, colors: ["midnight-black", "cement", "heavy-metal", "blueprint", "ice-cap", "ruby-flare"], interiors: ["moonstone-softex"], seats: 7, distinctExterior: true },
        { id: "limited", name: { he: "Limited AWD 7", en: "Limited AWD 7-Pass" }, blurb: { he: "עור ומסך גדול. בלי לבן ובלי Cement.", en: "Leather and the large screen. No white, no Cement." }, colors: ["wind-chill", "midnight-black", "heavy-metal", "blueprint", "ruby-flare"], interiors: ["black-leather"], seats: 7, distinctExterior: true },
        { id: "platinum", name: { he: "Platinum", en: "Platinum" }, blurb: { he: "קצה הגימור, עור מקדמיה.", en: "Top trim, Macadamia leather." }, colors: ["wind-chill", "midnight-black", "heavy-metal", "blueprint", "ruby-flare"], interiors: ["macadamia-leather"], seats: 7, distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "היברידית · FWD / AWD", en: "Hybrid · FWD / AWD" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "7 או 8", en: "7 or 8" } },
      ],
      highlights: [
        { he: "היברידית בכל הגימורים", en: "Hybrid in every trim" },
        { he: "גרסאות Mobility בתיקייה", en: "Mobility grades in the folder" },
      ],
    },
  ),
  toyota(
    "4runner",
    { he: "טויוטה פורראנר", en: "Toyota 4Runner" },
    { he: "שטח אמיתי, דור חדש", en: "Real off-road, new generation" },
    {
      he: "פורראנר 2026 על TNGA-F. בתיקייה: SR5, Limited 7 מקומות, TRD Sport ו־TRD Off-Road Premium — בלי TRD Pro.",
      en: "2026 4Runner on TNGA-F. In the folder: SR5, Limited 7-pass, TRD Sport and TRD Off-Road Premium — no TRD Pro.",
    },
    "suv",
    5,
    {
      defaultTrim: "sr5",
      defaultColor: "ice-cap",
      defaultInterior: "black-softex",
      colors: [P.white, P.black, P.under, P.wind, P.heritage, P.red, P.cutting],
      interiors: [I.blackFabric, I.blackSoftex, I.cockpit],
      trims: [
        { id: "sr5", name: { he: "SR5", en: "SR5" }, blurb: { he: "בסיס שטח. לבן, שחור ואנדרגראונד בלבד.", en: "Off-road base. White, black and Underground only." }, colors: ["ice-cap", "midnight-black", "underground"], interiors: ["black-softex"], seats: 5, distinctExterior: true },
        { id: "limited", name: { he: "Limited 7", en: "Limited 7-Pass" }, blurb: { he: "שבעה מקומות. יש סופרסוניק רד וווינד צ׳יל, אין לבן.", en: "Seven seats. Supersonic Red and Wind Chill; no white." }, colors: ["wind-chill", "heritage-blue", "midnight-black", "supersonic-red", "underground"], interiors: ["black-softex"], seats: 7, distinctExterior: true },
        { id: "trd-sport", name: { he: "TRD Sport", en: "TRD Sport" }, blurb: { he: "ספורט שטח. Cutting Edge רק כאן. אין לבן.", en: "On-road TRD. Cutting Edge is unique here. No white." }, colors: ["wind-chill", "heritage-blue", "cutting-edge", "midnight-black", "underground"], interiors: ["black-softex"], distinctExterior: true },
        { id: "trd-off-road", name: { he: "TRD Off-Road Premium", en: "TRD Off-Road Premium" }, blurb: { he: "מוכן לשטח. יש לבן, אין Wind Chill.", en: "Trail-ready. White is available; no Wind Chill." }, colors: ["heritage-blue", "midnight-black", "underground", "ice-cap"], interiors: ["black-softex"], distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "4x4 · i-FORCE", en: "4x4 · i-FORCE" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5 או 7", en: "5 or 7" } },
      ],
      highlights: [
        { he: "דור חדש לגמרי", en: "All-new generation" },
        { he: "Cutting Edge רק ב־TRD Sport", en: "Cutting Edge only on TRD Sport" },
      ],
    },
  ),
  toyota(
    "rav4-prime",
    { he: "טויוטה RAV4 פלאג־אין", en: "Toyota RAV4 Plug-in Hybrid" },
    { he: "פלאג־אין עם טווח חשמלי אמיתי", en: "Plug-in with real electric range" },
    {
      he: "RAV4 פלאג־אין 2026. SE בצבעים מלאים, XSE ו־GR Sport בעיקר שני גוונים עם גג שחור.",
      en: "2026 RAV4 plug-in. SE in solid colours; XSE and GR Sport mostly two-tone with a black roof.",
    },
    "suv",
    5,
    {
      hybrid: true,
      plugin: true,
      defaultTrim: "se",
      defaultColor: "ice-cap",
      defaultInterior: "black-blue-softex",
      colors: [P.white, P.black, P.blue, P.storm, P.brown, P.windRoof, P.stormRoof, P.redRoof, P.brownRoof],
      interiors: [
        { id: "black-blue-fabric", name: { he: "בד שחור/כחול", en: "Black/Blue fabric" }, hex: "#1a1e28" },
        { id: "black-blue-softex", name: { he: "סופטקס שחור/כחול", en: "Black/Blue SofTex" }, hex: "#1c222c" },
        { id: "black-red-ultrasuede", name: { he: "אולטרסוויד שחור/אדום", en: "Black/Red Ultrasuede" }, hex: "#2a1518" },
      ],
      trims: [
        { id: "se", name: { he: "SE AWD", en: "SE AWD" }, blurb: { he: "פלאג־אין בסיס בצבעים מלאים — כולל לבן ובלופרינט.", en: "Base plug-in in solid colours — including white and Blueprint." }, colors: ["brown-sugar", "midnight-black", "blueprint", "storm-cloud", "ice-cap"], interiors: ["black-blue-fabric"], plugin: true, distinctExterior: true },
        { id: "xse", name: { he: "XSE AWD", en: "XSE AWD" }, blurb: { he: "שני גוונים עם גג שחור. אין לבן, אין בלופרינט.", en: "Two-tone with black roof. No white, no Blueprint." }, colors: ["brown-sugar-black-roof", "storm-cloud-black-roof", "midnight-black", "wind-chill-black-roof"], interiors: ["black-blue-softex"], plugin: true, distinctExterior: true },
        { id: "xse-tech", name: { he: "XSE Technology", en: "XSE Technology" }, blurb: { he: "אותם צבעי XSE עם חבילת טכנולוגיה.", en: "Same XSE colours with the Technology package." }, colors: ["brown-sugar-black-roof", "storm-cloud-black-roof", "midnight-black", "wind-chill-black-roof"], interiors: ["black-blue-softex"], plugin: true, distinctExterior: true },
        { id: "gr-sport", name: { he: "GR Sport AWD", en: "GR Sport AWD" }, blurb: { he: "GR. סופרסוניק רד עם גג שחור רק כאן. אין בראון שוגר.", en: "GR. Supersonic Red with black roof only here. No Brown Sugar." }, colors: ["storm-cloud-black-roof", "midnight-black", "supersonic-red-black-roof", "wind-chill-black-roof"], interiors: ["black-red-ultrasuede"], plugin: true, distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "פלאג־אין הייבריד AWD", en: "Plug-in hybrid AWD" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "5", en: "5" } },
      ],
      highlights: [
        { he: "טעינה מהשקע בבית", en: "Charge at home" },
        { he: "גג שחור ב־XSE ו־GR", en: "Black roof on XSE and GR" },
      ],
    },
  ),
  toyota(
    "land-cruiser",
    { he: "טויוטה לנד קרוזר", en: "Toyota Land Cruiser" },
    { he: "אגדה לשנת 2027", en: "The legend, for 2027" },
    {
      he: "לנד קרוזר 2027 — i-FORCE MAX. 1958 בבראון שוגר ואינק בלבד. Premium מוסיף ווינד צ׳יל וגגות אפורים.",
      en: "2027 Land Cruiser — i-FORCE MAX. 1958 in Brown Sugar and Ink only. Premium adds Wind Chill and grey roofs.",
    },
    "suv",
    5,
    {
      year: 2027,
      hybrid: true,
      defaultTrim: "land-cruiser",
      defaultColor: "ice-cap",
      defaultInterior: "black-softex",
      colors: [P.white, P.brown, P.ink, P.under, P.wind, P.heritageRoof, P.trailRoof],
      interiors: [I.blackFabric, I.blackSoftex],
      trims: [
        { id: "1958", name: { he: "1958", en: "1958" }, blurb: { he: "עיצוב מורשת. בראון שוגר ואינק בלבד.", en: "Heritage look. Brown Sugar and Ink only." }, colors: ["brown-sugar", "ink"], interiors: ["black-fabric"], distinctExterior: true },
        { id: "land-cruiser", name: { he: "Land Cruiser", en: "Land Cruiser" }, blurb: { he: "גימור ראשי. כולל לבן; בלי ווינד צ׳יל.", en: "Main grade. Includes white; no Wind Chill." }, colors: ["brown-sugar", "ink", "heritage-blue-grey-roof", "underground", "ice-cap"], interiors: ["black-softex"], distinctExterior: true },
        { id: "premium", name: { he: "Premium", en: "Premium" }, blurb: { he: "ווינד צ׳יל וטרייל דאסט עם גג אפור. אין לבן.", en: "Wind Chill and Trail Dust with grey roof. No white." }, colors: ["brown-sugar", "wind-chill", "ink", "trail-dust-grey-roof", "heritage-blue-grey-roof", "underground"], interiors: ["black-softex"], distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "i-FORCE MAX הייבריד 4x4", en: "i-FORCE MAX hybrid 4x4" } },
        { label: { he: "שנה", en: "Year" }, value: { he: "2027", en: "2027" } },
      ],
      highlights: [
        { he: "1958 רק בבראון שוגר ואינק", en: "1958 only in Brown Sugar and Ink" },
        { he: "גג אפור בפרימיום", en: "Grey roof on Premium" },
      ],
    },
  ),
  toyota(
    "sequoia",
    { he: "טויוטה סקויה", en: "Toyota Sequoia" },
    { he: "SUV גדול עם שלושה טורים", en: "Full-size SUV with three rows" },
    {
      he: "סקויה 2026 — i-FORCE MAX. SR5 TRD Off-Road עם Mudbath, Nightshade, TRD Pro עם Wave Maker, Platinum ו־Capstone — כולל גרסאות מראות גרירה.",
      en: "2026 Sequoia — i-FORCE MAX. SR5 TRD Off-Road with Mudbath, Nightshade, TRD Pro with Wave Maker, Platinum and Capstone — including towing-mirror grades.",
    },
    "suv",
    8,
    {
      hybrid: true,
      defaultTrim: "capstone",
      defaultColor: "midnight-black",
      defaultInterior: "black-leather",
      colors: [P.white, P.black, P.silver, P.wind, P.magnetic, P.blue, P.red, P.lunar, P.wave, P.mudbath],
      interiors: [I.blackSoftex, I.blackLeather, I.ghGrayLeather],
      trims: [
        { id: "sr5-trd-off-road", name: { he: "SR5 TRD Off-Road", en: "SR5 TRD Off-Road" }, blurb: { he: "שטח. Mudbath ולונר רוק; אין ווינד צ׳יל.", en: "Trail. Mudbath and Lunar Rock; no Wind Chill." }, colors: ["mudbath", "magnetic-gray", "midnight-black", "lunar-rock", "ice-cap"], interiors: ["black-leather"], distinctExterior: true },
        { id: "nightshade", name: { he: "Limited Nightshade", en: "Limited Nightshade" }, blurb: { he: "חבילת שחור. Lunar Rock בלי Mudbath.", en: "Blacked-out Limited. Lunar Rock, no Mudbath." }, colors: ["celestial-silver", "wind-chill", "magnetic-gray", "midnight-black", "lunar-rock", "blueprint", "supersonic-red"], interiors: ["black-leather"], distinctExterior: true },
        { id: "trd-pro", name: { he: "TRD Pro", en: "TRD Pro" }, blurb: { he: "Wave Maker רק כאן. ארבעה צבעים בלבד.", en: "Wave Maker only here. Four colours only." }, colors: ["magnetic-gray", "wave-maker", "midnight-black", "ice-cap"], interiors: ["black-leather"], distinctExterior: true },
        { id: "platinum", name: { he: "Platinum", en: "Platinum" }, blurb: { he: "פרימיום. אין לבן, אין Wave Maker.", en: "Premium. No white, no Wave Maker." }, colors: ["celestial-silver", "wind-chill", "magnetic-gray", "midnight-black", "blueprint", "supersonic-red"], interiors: ["black-leather", "gray-leather"], distinctExterior: true },
        { id: "platinum-tow", name: { he: "Platinum · מראות גרירה", en: "Platinum with Towing Mirrors" }, blurb: { he: "אותם צבעי Platinum עם מראות גרירה.", en: "Same Platinum colours with towing mirrors." }, colors: ["celestial-silver", "wind-chill", "magnetic-gray", "midnight-black", "blueprint", "supersonic-red"], interiors: ["black-leather"], distinctExterior: true },
        { id: "capstone", name: { he: "Capstone", en: "Capstone" }, blurb: { he: "קצה הפרימיום.", en: "Top of the range." }, colors: ["celestial-silver", "wind-chill", "magnetic-gray", "midnight-black", "blueprint", "supersonic-red"], interiors: ["black-leather", "gray-leather"], distinctExterior: true },
        { id: "capstone-tow", name: { he: "Capstone · מראות גרירה", en: "Capstone with Towing Mirrors" }, blurb: { he: "Capstone עם מראות גרירה.", en: "Capstone with towing mirrors." }, colors: ["celestial-silver", "wind-chill", "magnetic-gray", "midnight-black", "blueprint", "supersonic-red"], interiors: ["black-leather"], distinctExterior: true },
      ],
      specs: [
        { label: { he: "הנעה", en: "Drivetrain" }, value: { he: "i-FORCE MAX", en: "i-FORCE MAX" } },
        { label: { he: "מושבים", en: "Seats" }, value: { he: "עד 8", en: "Up to 8" } },
      ],
      highlights: [
        { he: "Mudbath רק ב־SR5 TRD Off-Road", en: "Mudbath only on SR5 TRD Off-Road" },
        { he: "Wave Maker רק ב־TRD Pro", en: "Wave Maker only on TRD Pro" },
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

