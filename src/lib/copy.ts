export type Lang = "he" | "en";

export type Copy = {
  skip: string;
  langSwitch: string;
  langSwitchAria: string;
  quote: string;
  call: string;
  menu: string;
  close: string;
  details: string;
  whatsapp: string;
  whatsappPrefill: string;
  nav: {
    toyota: string;
    honda: string;
    financing: string;
    leasing: string;
    about: string;
    contact: string;
  };
  heroKicker: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroSecondary: string;
  featured: string;
  featuredSub: string;
  trust: { n: string; l: string }[];
  servicesTitle: string;
  services: { t: string; d: string }[];
  angloKicker: string;
  angloTitle: string;
  angloBody: string;
  stepsTitle: string;
  steps: { t: string; d: string }[];
  ctaBand: string;
  ctaBandBody: string;
  footer: { tag: string; legal: string; social: string; disclaimer: string };
  toyotaTitle: string;
  toyotaSub: string;
  hondaTitle: string;
  hondaSub: string;
  aboutKicker: string;
  aboutTitle: string;
  aboutBody: string[];
  aboutTeaser: string;
  aboutTeaserBody: string;
  values: { t: string; d: string }[];
  financeKicker: string;
  financeTitle: string;
  financeSub: string;
  financeItems: { t: string; d: string }[];
  leaseKicker: string;
  leaseTitle: string;
  leaseSub: string;
  leaseItems: { t: string; d: string }[];
  contactKicker: string;
  contactTitle: string;
  contactSub: string;
  showroom: string;
  hours: string;
  formTitle: string;
  form: {
    name: string;
    phone: string;
    email: string;
    model: string;
    message: string;
    interest: string;
    buy: string;
    finance: string;
    lease: string;
    send: string;
    consent: string;
    sent: string;
  };
  car: {
    back: string;
    trim: string;
    color: string;
    plugin: string;
    fromUs: string;
    specs: string;
    highlights: string;
    quoteTitle: string;
    quoteBody: string;
  };
  notFound: { title: string; body: string };
};

export const copy: Record<Lang, Copy> = {
  he: {
    skip: "דלג לתוכן",
    langSwitch: "EN",
    langSwitchAria: "Switch to English",
    quote: "קבלו הצעה",
    call: "התקשרו",
    menu: "תפריט",
    close: "סגירה",
    details: "פרטים",
    whatsapp: "וואטסאפ",
    whatsappPrefill: "שלום, אשמח לקבל פרטים על רכב ביבוא מארה״ב",
    nav: {
      toyota: "טויוטה",
      honda: "הונדה",
      financing: "מימון",
      leasing: "ליסינג",
      about: "אודות",
      contact: "צור קשר",
    },
    heroKicker: "יבוא מקביל מארצות הברית",
    heroTitle: "סעו את החלום",
    heroSub:
      "טרגט מוטורס מייבאת טויוטה והונדה מארה״ב — עם ליווי בעברית ובאנגלית, מימון וליסינג, ואולם תצוגה בירושלים.",
    heroCta: "גלו את ההגעות",
    heroSecondary: "דגמי טויוטה 2026",
    featured: "הגעות אחרונות",
    featuredSub: "2026 מארה״ב — בלי מחירים מומצאים. הצעת מחיר אישית אחרי שיחה.",
    trust: [
      { n: "2016", l: "שנת הקמה" },
      { n: "US", l: "יבוא מקביל" },
      { n: "ירושלים", l: "אולם תצוגה" },
      { n: "077", l: "שיחה ישירה" },
    ],
    servicesTitle: "איך קונים אצלנו",
    services: [
      {
        t: "יבוא מקביל",
        d: "דגמים אמריקאיים שלא תמיד מגיעים דרך היבואן הרשמי — עם שקיפות מלאה על המפרט.",
      },
      {
        t: "מימון",
        d: "מסלולי מימון דרך שותפים בנקאיים וחוץ־בנקאיים. התנאים נקבעים לפי הרכב והפרופיל.",
      },
      {
        t: "ליסינג",
        d: "ליסינג פרטי ועסקי לדגמי טויוטה והונדה. נבנה הצעה אחרי שיחת אפיון.",
      },
    ],
    angloKicker: "For English speakers",
    angloTitle: "הדילר ששם את דוברי האנגלית במרכז",
    angloBody:
      "צוות דו־לשוני, תהליך ברור, וליווי מבחירת הדגם עד המסירה. Up to 40% discount for visa holders — לפי הזכאות האישית.",
    stepsTitle: "שלושה צעדים",
    steps: [
      { t: "בחרו דגם", d: "עיינו בטויוטה ובהונדה, בחרו רמת גימור וצבע." },
      { t: "דברו איתנו", d: "וואטסאפ או טופס — נחזור עם זמינות והצעה." },
      { t: "מסירה", d: "רישוי, מימון או ליסינג, ומסירה בירושלים." },
    ],
    ctaBand: "רוצים הצעת מחיר?",
    ctaBandBody: "בלי מחיר באתר. נבדוק זמינות ונחזור עם מספר אמיתי.",
    footer: {
      tag: "יבוא מקביל לטויוטה והונדה מארצות הברית. אולם תצוגה בירושלים.",
      legal: "טרגט מוטורס מ.ר 2016 בע״מ",
      social: "קישורים",
      disclaimer:
        "התמונות להמחשה. המפרט, הצבעים ורמות הגימור תלויים בשנת הדגם ובזמינות היבוא. אין באתר מחירון — כל הצעה אישית.",
    },
    toyotaTitle: "דגמי טויוטה 2026",
    toyotaSub: "יבוא מקביל מארה״ב — גרנד היילנדר, סיינה, קאמרי, פורראנר, RAV4 פלאג־אין, לנד קרוזר וסקויה.",
    hondaTitle: "דגמי הונדה",
    hondaSub: "יבוא מקביל מארה״ב — אודיסי, סיוויק, CR-V, אקורד ופיילוט.",
    aboutKicker: "אודות",
    aboutTitle: "טרגט מוטורס — לקנות רכב בראש שקט",
    aboutBody: [
      "טרגט מוטורס הוקמה רשמית בשנת 2016, אך בעלי החברה פועלים בשוק הרכב בארץ ובחו״ל כבר למעלה מעשור, ומלווים מאות לקוחות.",
      "אנחנו יבואן מקביל לרכבים מארצות הברית — בעיקר טויוטה והונדה — עם דגש על שקיפות, אחריות וליווי עד המסירה.",
      "החברה מתפתחת משנה לשנה. בנוסף לדגמים הייחודיים של טויוטה והונדה, מתוכננים מותגים נוספים בהמשך.",
    ],
    aboutTeaser: "אולם התצוגה",
    aboutTeaserBody: "ירמיהו 68, ירושלים. מוזמנים לתאם הגעה.",
    values: [
      { t: "שקיפות", d: "מפרט אמיתי, בלי הפתעות במסירה." },
      { t: "ליווי", d: "עברית ואנגלית — מבחירה עד רישוי." },
      { t: "גב כלכלי", d: "מימון וליסינג לפי הצורך, לא לפי לחץ." },
    ],
    financeKicker: "מימון",
    financeTitle: "מימון שמתאים לרכב — לא להפך",
    financeSub: "עובדים עם גופי מימון. הריבית, ההון העצמי והתקופה נקבעים אחרי בדיקה. לא מפרסמים ריביות באתר.",
    financeItems: [
      { t: "רכישה פרטית", d: "מימון לרכב חדש ביבוא מקביל, כולל אופציות להון עצמי גמיש." },
      { t: "מסלול ויזה", d: "הטבות לבעלי ויזה — לפי זכאות. נבדוק במשרד." },
      { t: "אישור עקרוני", d: "שולחים מסמכים, מקבלים מסגרת, ורק אז סוגרים דגם." },
    ],
    leaseKicker: "ליסינג",
    leaseTitle: "ליסינג פרטי ועסקי",
    leaseSub: "תשלום חודשי במקום רכישה מלאה. התנאים תלויים בדגם, בקילומטראז׳ ובתקופה.",
    leaseItems: [
      { t: "פרטי", d: "ליסינג לדגמי משפחה — סיינה, גרנד היילנדר, אודיסי." },
      { t: "עסקי", d: "חשבונית וניהול צי קטן. נתאים חבילה אחרי שיחה." },
      { t: "גמישות", d: "תקופה וקילומטראז׳ לפי שימוש אמיתי, לא לפי טמפלט." },
    ],
    contactKicker: "צור קשר",
    contactTitle: "אנחנו כאן בשבילכם",
    contactSub: "וואטסאפ, טלפון, או טופס. נחזור במהירות.",
    showroom: "אולם תצוגה",
    hours: "שעות פעילות",
    formTitle: "השארת פנייה",
    form: {
      name: "שם מלא",
      phone: "טלפון",
      email: "אימייל",
      model: "דגם שמעניין",
      message: "הודעה",
      interest: "מה מעניין",
      buy: "רכישה",
      finance: "מימון",
      lease: "ליסינג",
      send: "שליחה",
      consent: "אני מאשר/ת שטרגט מוטורס יחזרו אליי לגבי הפנייה.",
      sent: "הפנייה נקלטה. נחזור אליכם בהקדם.",
    },
    car: {
      back: "חזרה לדגמים",
      trim: "רמת גימור",
      color: "צבע",
      plugin: "פלאג־אין",
      fromUs: "מארה״ב",
      specs: "מפרט",
      highlights: "עיקרי הדגם",
      quoteTitle: "הצעת מחיר",
      quoteBody: "אין מחיר באתר. שלחו פנייה ונחזור עם זמינות ומספר.",
    },
    notFound: { title: "העמוד לא נמצא", body: "חזרו לדף הבית או לדגמים." },
  },
  en: {
    skip: "Skip to content",
    langSwitch: "עב",
    langSwitchAria: "מעבר לעברית",
    quote: "Get a quote",
    call: "Call",
    menu: "Menu",
    close: "Close",
    details: "Details",
    whatsapp: "WhatsApp",
    whatsappPrefill: "Hi, I would like details on a US-import vehicle",
    nav: {
      toyota: "Toyota",
      honda: "Honda",
      financing: "Financing",
      leasing: "Leasing",
      about: "About",
      contact: "Contact",
    },
    heroKicker: "Parallel import from the United States",
    heroTitle: "Drive your dream",
    heroSub:
      "Target Motors imports Toyota and Honda from the US — bilingual support, financing and leasing, showroom in Jerusalem.",
    heroCta: "Discover arrivals",
    heroSecondary: "2026 Toyota models",
    featured: "Latest arrivals",
    featuredSub: "2026 US models. No invented prices — a real quote after we talk.",
    trust: [
      { n: "2016", l: "Established" },
      { n: "US", l: "Parallel import" },
      { n: "Jerusalem", l: "Showroom" },
      { n: "077", l: "Direct line" },
    ],
    servicesTitle: "How buying works",
    services: [
      {
        t: "Parallel import",
        d: "US-spec Toyota and Honda that the official channel may not offer — with a clear spec sheet.",
      },
      {
        t: "Financing",
        d: "Bank and non-bank partners. Terms depend on the car and your profile — not a website rate.",
      },
      {
        t: "Leasing",
        d: "Private and business leases. We build the offer after a short intake call.",
      },
    ],
    angloKicker: "For English speakers",
    angloTitle: "The dealership that puts Anglos first",
    angloBody:
      "Bilingual desk, a clear process, and support from model choice to delivery. Up to 40% discount for visa holders — subject to eligibility.",
    stepsTitle: "Three steps",
    steps: [
      { t: "Pick a model", d: "Browse Toyota and Honda, then choose a trim and color." },
      { t: "Talk to us", d: "WhatsApp or the form — we come back with availability." },
      { t: "Delivery", d: "Registration, financing or leasing, handover in Jerusalem." },
    ],
    ctaBand: "Want a quote?",
    ctaBandBody: "No prices on the site. We check availability and return a real number.",
    footer: {
      tag: "Parallel import of Toyota and Honda from the United States. Showroom in Jerusalem.",
      legal: "Target Motors Ltd.",
      social: "Links",
      disclaimer:
        "Images are for illustration. Specs, colors and trims depend on model year and import availability. No price list on the site — every quote is personal.",
    },
    toyotaTitle: "2026 Toyota models",
    toyotaSub: "US parallel import — Grand Highlander, Sienna, Camry, 4Runner, RAV4 Plug-in, Land Cruiser and Sequoia.",
    hondaTitle: "Honda models",
    hondaSub: "US parallel import — Odyssey, Civic, CR-V, Accord and Pilot.",
    aboutKicker: "About",
    aboutTitle: "Target Motors — buy a car with a clear head",
    aboutBody: [
      "Target Motors was founded in 2016, but the owners have worked in the car market in Israel and abroad for more than a decade, supporting hundreds of customers.",
      "We are a parallel importer of vehicles from the United States — mainly Toyota and Honda — with a focus on transparency, responsibility and support through delivery.",
      "The company grows every year. Alongside the Toyota and Honda lineup, additional brands are planned.",
    ],
    aboutTeaser: "Showroom",
    aboutTeaserBody: "68 Yirmiyahu St, Jerusalem. Book a visit.",
    values: [
      { t: "Transparency", d: "Real spec, no surprises at handover." },
      { t: "Support", d: "Hebrew and English — from choice to registration." },
      { t: "Financing", d: "Finance and leasing when you need them, not under pressure." },
    ],
    financeKicker: "Financing",
    financeTitle: "Financing that fits the car — not the other way around",
    financeSub: "We work with finance partners. Rate, down payment and term are set after a check. No rates published here.",
    financeItems: [
      { t: "Private purchase", d: "Finance for a new parallel-import vehicle, including flexible down-payment options." },
      { t: "Visa path", d: "Benefits for visa holders — subject to eligibility. We check in the office." },
      { t: "Pre-approval", d: "Send documents, get a frame, then lock the model." },
    ],
    leaseKicker: "Leasing",
    leaseTitle: "Private and business leasing",
    leaseSub: "A monthly payment instead of a full purchase. Terms depend on the model, mileage and term.",
    leaseItems: [
      { t: "Private", d: "Leasing for family models — Sienna, Grand Highlander, Odyssey." },
      { t: "Business", d: "Invoice and small-fleet management. We fit a package after a call." },
      { t: "Flexibility", d: "Term and mileage by real use, not a template." },
    ],
    contactKicker: "Contact",
    contactTitle: "We are here for you",
    contactSub: "WhatsApp, phone, or the form. We reply quickly.",
    showroom: "Showroom",
    hours: "Hours",
    formTitle: "Leave a request",
    form: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      model: "Model of interest",
      message: "Message",
      interest: "I am interested in",
      buy: "Purchase",
      finance: "Financing",
      lease: "Leasing",
      send: "Send",
      consent: "I agree that Target Motors may contact me about this request.",
      sent: "Request received. We will get back to you shortly.",
    },
    car: {
      back: "Back to models",
      trim: "Trim",
      color: "Color",
      plugin: "Plug-in",
      fromUs: "From the US",
      specs: "Spec",
      highlights: "Highlights",
      quoteTitle: "Request a quote",
      quoteBody: "No price on the site. Send a request and we return availability and a number.",
    },
    notFound: { title: "Page not found", body: "Go back home or to the models." },
  },
};
