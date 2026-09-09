// Canadian 2026 model facts checked on 10 September 2026 against the sources below.
// Studio IDs refer to the existing, exact trim and upholstery image registry.
export type SiennaText = { he: string; en: string };
const l = (he: string, en: string): SiennaText => ({ he, en });

export const SIENNA_SOURCES = {
  overview: "https://www.toyota.ca/en/vehicles/sienna/overview/",
  features: "https://www.toyota.ca/en/vehicles/sienna/features-benefits/",
  specifications: "https://www.toyota.ca/content/toyota/en/build-price.generate.summaries.series-SIH.year-2026.province-ON.pdf",
  release: "https://media.toyota.ca/en/releases/2025/now-on-sale--2026-toyota-sienna.html",
};

export type SiennaGrade = {
  id: string; name: string; title: SiennaText; description: SiennaText;
  seats: 7 | 8; drive: string; screen: string; audio: string;
  packageFor?: string; features: SiennaText[]; variants: { id: string; label: string }[];
};

export const SIENNA_GRADES: SiennaGrade[] = [
  {
    id: "le", name: "LE", title: l("שמונה מקומות ליום־יום", "Eight seats for every day"),
    description: l("אבזור שימושי למשפחה, עם בחירה בין הנעה קדמית לכפולה.", "Family essentials, with a choice of front-wheel or all-wheel drive."),
    seats: 8, drive: "FWD / AWD", screen: '8″', audio: "8",
    features: [l("מושבים קדמיים מחוממים וריפוד בד", "Heated front seats and fabric upholstery"), l("דלתות הזזה ודלת תא מטען חשמליות", "Power sliding doors and power tailgate"), l("מיזוג לשלושה אזורים", "Three-zone climate control"), l("חישוקי סגסוגת 17 אינץ׳", '17-inch alloy wheels')],
    variants: [{ id: "le-fwd", label: "LE FWD" }, { id: "le-awd", label: "LE AWD" }],
  },
  {
    id: "xle", name: "XLE", title: l("יותר נוחות, עדיין שמונה", "More comfort. Still eight seats."),
    description: l("ריפוד SofTex ותוספות נוחות, בלי לוותר על המושב השמיני.", "SofTex upholstery and added convenience, keeping the eighth seat."),
    seats: 8, drive: "FWD", screen: '12.3″', audio: "8",
    features: [l("ריפוד SofTex ומושב נוסע קדמי חשמלי", "SofTex upholstery and power front passenger seat"), l("גג שמש חשמלי", "Power moonroof"), l("דלתות הזזה ותא מטען עם חיישני פתיחה ברגל", "Kick-sensor sliding doors and tailgate"), l("מיזוג לארבעה אזורים", "Four-zone climate control")],
    variants: [{ id: "xle", label: "XLE FWD" }],
  },
  {
    id: "xse", name: "XSE", title: l("אופי ספורטיבי. מרחב אישי.", "Sporting character. Personal space."),
    description: l("עיצוב ספורטיבי ושני מושבי קפטן בשורה השנייה.", "Sport styling with two individual second-row captain’s chairs."),
    seats: 7, drive: "FWD / AWD", screen: '12.3″', audio: "JBL · 12",
    features: [l("מתלים בכיול ספורטיבי וריפוד SofTex ספורטיבי", "Sport-tuned suspension and sport SofTex seats"), l("מושבי קפטן עם מסילות ארוכות", "Long-slide captain’s chairs"), l("לוח מחוונים דיגיטלי 12.3 אינץ׳", '12.3-inch digital instrument display'), l("חישוקי 20 אינץ׳ ב־FWD או 18 אינץ׳ כהים ב־AWD", '20-inch wheels on FWD; dark 18-inch wheels on AWD')],
    variants: [{ id: "xse-fwd", label: "XSE FWD" }, { id: "xse-awd", label: "XSE AWD" }],
  },
  {
    id: "xse-technology", name: "XSE Technology", title: l("תוספות לנסיעות ארוכות", "Extras for longer journeys"),
    description: l("חבילת טכנולוגיה על בסיס XSE AWD, עם אבזור נוסף לנוסעים ולחניה.", "An XSE AWD package adding passenger entertainment and parking equipment."),
    seats: 7, drive: "AWD", screen: '12.3″', audio: "JBL · 12", packageFor: "XSE AWD",
    features: [l("מערכת בידור אחורית עם HDMI ואוזניות", "Rear entertainment with HDMI and headphones"), l("מראה פנימית דיגיטלית", "Digital rear-view mirror"), l("מצלמה אחורית רחבה עם מתז ומערכת סיוע בחניה", "Wide-angle rear camera with washer and parking assistance"), l("שקע 120V / 1,500W ופנסי ערפל LED", "120V / 1,500W outlet and LED fog lamps")],
    variants: [{ id: "xse-tech", label: "XSE Technology AWD" }],
  },
  {
    id: "limited", name: "Limited", title: l("נוחות בכל שורה", "Comfort in every row"),
    description: l("אבזור נוחות עשיר, ריפוד עור ומושבי קפטן עם הדומים.", "Leather seating and an expanded comfort specification, including second-row ottomans."),
    seats: 7, drive: "AWD", screen: '12.3″', audio: "JBL · 12",
    features: [l("מושבים קדמיים מחוממים ומאווררים", "Heated and ventilated front seats"), l("מושבי שורה שנייה מחוממים עם הדומים", "Heated second-row seats with ottomans"), l("מצלמות היקפיות ומראה פנימית דיגיטלית", "Panoramic View Monitor and digital rear-view mirror"), l("מערכת בידור אחורית ושקע 120V / 1,500W", "Rear entertainment and 120V / 1,500W outlet")],
    variants: [{ id: "limited", label: "Limited AWD" }],
  },
  {
    id: "platinum", name: "Platinum", title: l("פרטים קטנים. נוחות גדולה.", "The finishing touches"),
    description: l("חבילת האבזור הבכירה על בסיס Limited AWD.", "The top equipment package, based on Limited AWD."),
    seats: 7, drive: "AWD", screen: '12.3″', audio: "JBL · 12", packageFor: "Limited AWD",
    features: [l("תצוגת מידע עילית לשמשה", "Head-up display"), l("מקרר FridgeBox מובנה", "Integrated FridgeBox"), l("שואב אבק מובנה", "Built-in vacuum"), l("ריפוד עור מקדמיה וחישוקי 18 אינץ׳ דו־גוניים", "Macadamia leather and two-tone 18-inch wheels")],
    variants: [{ id: "platinum", label: "Platinum AWD" }],
  },
];

export const SIENNA_SPECIFICATIONS = [
  [l("מערכת הנעה", "Powertrain"), l("היברידית · מנוע 2.5 ל׳, 4 צילינדרים", "Hybrid · 2.5-litre, four-cylinder engine")],
  [l("הספק מערכת משולב", "Combined system output"), l("245 כ״ס / 183 קילוואט", "245 hp / 183 kW")],
  [l("תיבת הילוכים", "Transmission"), l("eCVT אוטומטית", "Automatic eCVT")],
  [l("צריכה משולבת — FWD / AWD", "Combined consumption — FWD / AWD"), l("6.6 / 6.8 ל׳ ל־100 ק״מ*", "6.6 / 6.8 L/100 km*")],
  [l("אורך", "Length"), l("5,175 מ״מ · 5,185 מ״מ ב־XSE", "5,175 mm · 5,185 mm for XSE")],
  [l("רוחב / גובה", "Width / height"), l("1,994 / 1,776 מ״מ", "1,994 / 1,776 mm")],
  [l("בסיס גלגלים", "Wheelbase"), l("3,061 מ״מ", "3,061 mm")],
  [l("מטען מאחורי השורה השלישית", "Cargo behind the third row"), l("949 ליטר", "949 litres")],
  [l("מטען מאחורי השורה השנייה", "Cargo behind the second row"), l("עד 2,129 ליטר", "Up to 2,129 litres")],
];

export const SIENNA_PHOTOS = [
  { file: "sliding-door", width: 1196, height: 590, caption: l("Limited · דלתות הזזה חשמליות", "Limited · power sliding doors"), alt: l("ילדים נכנסים לסיינה Limited בצבע Heavy Metal דרך דלת ההזזה", "Children entering a Heavy Metal Sienna Limited through the sliding door"), url: "https://toyotacanada.scene7.com/is/image/toyotacanada/toyota-2026-features-design-sienna-limited-heavy-metal-sliding-door-l?fit=constrain&wid=1600&qlt=90" },
  { file: "dashboard", width: 1196, height: 590, caption: l("XSE · בקרת אקלים ומולטימדיה", "XSE · climate and multimedia controls"), alt: l("נהגת מכוונת את בקרת האקלים במסך הסיינה XSE", "Driver adjusting the Sienna XSE climate controls"), url: "https://toyotacanada.scene7.com/is/image/toyotacanada/toyota-2026-features-design-sienna-xse-interior-dashboard-climate-control-l?fit=constrain&wid=1600&qlt=90" },
  { file: "entertainment", width: 751, height: 440, caption: l("Limited · מערכת בידור אחורית", "Limited · rear-seat entertainment"), alt: l("נוסעת בשורה השנייה בסיינה Limited משתמשת בשלט של מסך הבידור", "Second-row passenger using the Sienna Limited entertainment remote"), url: "https://toyotacanada.scene7.com/is/image/toyotacanada/toyota-2026-features-technology-sienna-limited-rear-seat-entertainment-l?fit=constrain&wid=751" },
];
