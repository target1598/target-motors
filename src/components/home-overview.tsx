import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Globe2, MapPin, Phone, ShieldCheck, Wallet, Wrench } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { BODY_LABEL, carImage, carsByBrand, type Car } from "@/lib/cars";
import { COMPANY, whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";
import { observeSiennaMotion, type SiennaMotion } from "@/lib/sienna-motion";
import "./home-overview.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function Reveal({ children, motion = "rise", delay = 0, className = "" }: { children: ReactNode; motion?: SiennaMotion; delay?: number; className?: string }) {
  const boundary = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!boundary.current || !content.current) return;
    return observeSiennaMotion(boundary.current, content.current, motion, delay);
  }, [motion, delay]);
  return <div ref={boundary} className={`home-reveal ${className}`}><div ref={content} className="home-reveal-content">{children}</div></div>;
}

function Chapter({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return <Reveal><header className="home-chapter"><span aria-hidden="true">{number}</span><div><p>{label}</p><h2 id={id}>{title}</h2></div></header></Reveal>;
}

function ModelCard({ car }: { car: Car }) {
  const { lang, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  return <Link className="home-model" to={car.brand === "toyota" ? "/toyota/$slug" : "/honda/$slug"} params={{ slug: car.slug }}>
    <div className="home-model-image"><span className="home-model-year">{car.year}</span><img src={carImage(car)} alt={car.name[lang]} loading="lazy" decoding="async" width="800" height="400" /></div>
    <div className="home-model-copy"><p className="home-model-type">{BODY_LABEL[car.body][lang]}<span aria-hidden="true">/</span>{car.plugin ? "Plug-in Hybrid" : car.hybrid ? "Hybrid" : (lang === "he" ? "בנזין" : "Gasoline")}</p><h3>{car.name[lang]}</h3><p>{car.tagline[lang]}</p><span className="home-model-link">{lang === "he" ? "לגלות את הדגם" : "Explore this model"}<Arrow size={19} aria-hidden="true" /></span></div>
  </Link>;
}

export function HomeOverview() {
  const { lang, dir, t } = useLanguage();
  const he = lang === "he";
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [brand, setBrand] = useState<Car["brand"]>("toyota");
  const models = carsByBrand(brand).slice(0, 6);
  const contact = whatsappHref(he ? "שלום, אשמח לקבל פרטים על רכב ולתאם ביקור בטרגט מוטורס." : "Hi, I would like vehicle information and to arrange a visit to Target Motors.");
  return <main className="home-overview" dir={dir}>
    <section className="home-hero home-container" aria-labelledby="home-title">
      <div className="home-hero-intro"><div><p className="home-eyebrow" lang="en">TARGET MOTORS / JERUSALEM</p><h1 id="home-title">{he ? "הרכב הבא שלכם." : "Your next car."}<br /><span>{he ? "הדרך מתחילה כאן." : "Your journey starts here."}</span></h1></div>
        <div className="home-hero-copy"><p>{he ? "טויוטה והונדה ביבוא מקביל מארצות הברית. דגמים למשפחה, לעיר ולדרך הפתוחה — עם הצוות של טרגט מוטורס לצידכם, מבחירת הרכב ועד המסירה." : "Toyota and Honda, imported from the United States. Cars for family life, city streets and the open road — with Target Motors beside you, from choosing your vehicle to collecting the keys."}</p><div className="home-actions"><a href="#home-models" className="home-button home-button-red">{he ? "גלו את הדגמים" : "Explore the models"}<Arrow size={18} aria-hidden="true" /></a><a href="#home-contact" className="home-button home-button-outline">{he ? "בואו נדבר" : "Let’s talk"}</a></div></div>
      </div>
      <figure className="home-hero-photo"><picture><source media="(max-width: 600px)" srcSet={asset("images/home/grand-highlander-mobile.webp")} width="800" height="812" /><img src={asset("images/home/grand-highlander.webp")} alt={he ? "טויוטה גרנד היילנדר בצבע סטורם קלאוד בנסיעה בדרך מיוערת" : "Toyota Grand Highlander in Storm Cloud on a tree-lined road"} width="1800" height="628" fetchPriority="high" /></picture><figcaption><div><span className="home-photo-label">{he ? "מקום לדרך שלכם" : "SPACE FOR YOUR JOURNEY"}</span><strong lang="en">GRAND HIGHLANDER</strong></div><Link to="/toyota/$slug" params={{ slug: "grand-highlander" }}>{he ? "הכירו מקרוב" : "Take a closer look"}<Arrow size={20} aria-hidden="true" /></Link></figcaption></figure>
    </section>
    <div className="home-facts-band"><dl className="home-facts home-container">{[
      ["2016", he ? "הדרך שלנו התחילה" : "Our story began"], [he ? "מארה״ב" : "From the US", he ? "יבוא מקביל לישראל" : "Parallel imports to Israel"], ["Toyota + Honda", he ? "דגמים שכדאי להכיר" : "Models worth discovering"], [he ? "ירושלים" : "Jerusalem", he ? "אולם התצוגה שלנו" : "Our showroom"],
    ].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>

    <section id="home-models" className="home-section home-container" aria-labelledby="home-models-title">
      <Chapter number="01" label={he ? "הדגמים שלנו" : "OUR COLLECTION"} title={he ? "לכל דרך, הרכב שלה." : "A car for every kind of journey."} id="home-models-title" />
      <div className="home-model-toolbar"><p>{he ? "הכירו את הדגמים, הגימורים והצבעים. בחרו את הרכב שמעניין אתכם והיכנסו לפרטים." : "Discover the models, trims and colors. Choose a vehicle to take a closer look."}</p><div className="home-brand-switch" role="group" aria-label={he ? "בחירת מותג" : "Choose a brand"}>{(["toyota", "honda"] as const).map((item) => <button key={item} type="button" aria-pressed={brand === item} aria-controls="home-model-grid" onClick={() => setBrand(item)}>{item === "toyota" ? "Toyota" : "Honda"}<span>{carsByBrand(item).length}</span></button>)}</div></div>
      <div id="home-model-grid" className="home-model-grid" aria-label={brand === "toyota" ? t.nav.toyota : t.nav.honda}>{models.map((car, i) => <Reveal key={car.slug} motion="card" delay={(i % 3) * 70}><ModelCard car={car} /></Reveal>)}</div>
      <div className="home-model-bottom"><p>{he ? "הדגמים מוצגים להיכרות. זמינות, מפרט ומחיר נבדקים בהצעה אישית." : "Explore the range. Availability, specifications and pricing are confirmed in your personal quote."}</p><Link className="home-text-link" to={brand === "toyota" ? "/toyota" : "/honda"}>{he ? `לכל דגמי ${brand === "toyota" ? "טויוטה" : "הונדה"}` : `View all ${brand === "toyota" ? "Toyota" : "Honda"} models`}<Arrow size={18} aria-hidden="true" /></Link></div>
    </section>

    <section className="home-spotlight-band" aria-labelledby="home-sienna-title"><div className="home-container home-spotlight"><Reveal motion="image"><img className="home-spotlight-photo" src={asset("images/sienna/cabin.webp")} alt={he ? "מבט אל מושבי הקפטן בתא הנוסעים של טויוטה סיינה" : "Captain’s chairs inside the Toyota Sienna"} width="1280" height="1024" loading="lazy" /></Reveal><Reveal><div className="home-spotlight-copy"><p className="home-eyebrow">{he ? "להכיר. להשוות. לראות מקרוב." : "DISCOVER. COMPARE. EXPLORE."}</p><h2 id="home-sienna-title">{he ? "סיינה. מקום לכל מה שחשוב." : "Sienna. Room for what matters."}</h2><p>{he ? "גלו את הסיינה מבפנים ומבחוץ: הכירו את רמות הגימור, קראו על האבזור, ופתחו את הסטודיו כדי לראות את הצבעים ואת תא הנוסעים." : "Get to know the Sienna inside and out. Explore the trims and equipment, then open the studio to see the paint colors and cabin."}</p><ul className="home-keywords"><li>{he ? "רמות גימור" : "Trim levels"}</li><li>{he ? "צבעי חוץ" : "Exterior colors"}</li><li>{he ? "תא נוסעים" : "Cabin finishes"}</li></ul><div className="home-actions"><Link to="/toyota/sienna" className="home-button home-button-red">{he ? "לעמוד הסיינה" : "Discover Sienna"}<Arrow size={18} aria-hidden="true" /></Link><Link to="/toyota/sienna/studio" className="home-text-link">{he ? "לסטודיו" : "Open the studio"}<Arrow size={18} aria-hidden="true" /></Link></div></div></Reveal></div></section>

    <section id="home-services" className="home-section home-container" aria-labelledby="home-services-title">
      <Chapter number="02" label={he ? "השירות שלנו" : "HERE FOR YOU"} title={he ? "יותר מהרכב. כל הדרך אליו." : "More than a car. Support along the way."} id="home-services-title" />
      <div className="home-services-grid">{[
        { Icon: Globe2, title: he ? "יבוא מקביל" : "Parallel imports", text: he ? "קשרים וניסיון בשוק הרכב בארץ ובחו״ל, שמאפשרים להציע מבחר דגמים ורמות גימור. הצוות שלנו יעזור לכם להבין את האפשרויות." : "Experience and relationships in Israel and abroad bring you a choice of models and trims. Our team helps you understand the options.", to: "/about" as const, link: he ? "על הדרך שלנו" : "Our approach" },
        { Icon: Wallet, title: he ? "מימון לרכב" : "Vehicle financing", text: he ? "אפשרויות מימון באמצעות בנקים וגופי מימון, עם התאמה לצרכים שלכם. ניתן לברר גם על מסלולים לעולים חדשים ולתושבי חוץ, בכפוף לזכאות ולאישור הגוף המממן." : "Explore options through banks and finance providers, including enquiries for new immigrants and foreign residents. Terms depend on eligibility and lender approval.", to: "/financing" as const, link: he ? "לאפשרויות המימון" : "Explore financing" },
        { Icon: Wrench, title: he ? "שירות ואחריות" : "Service & warranty", text: he ? "מידע על האחריות, הטיפולים וקריאות השירות של הרכב שלכם. הצוות שלנו כאן לשאלות ולליווי גם אחרי קבלת המפתחות." : "Information about your vehicle’s warranty, maintenance and recall notices. Our team is here for questions and support after you receive the keys, too.", to: "/contact" as const, link: he ? "דברו עם הצוות" : "Speak to the team" },
      ].map(({ Icon, title, text, to, link }, i) => <Reveal key={to} motion="card" delay={i * 70}><article className="home-service"><Icon size={26} aria-hidden="true" /><h3>{title}</h3><p>{text}</p><Link to={to} className="home-text-link">{link}<Arrow size={18} aria-hidden="true" /></Link></article></Reveal>)}</div>
      <div className="home-service-note"><ShieldCheck size={23} aria-hidden="true" /><p>{he ? "רכישה, מימון או ליסינג — מתחילים בהיכרות עם הצרכים שלכם." : "Buying, financing or leasing — it starts with understanding what you need."}</p><Link to="/leasing" className="home-text-link">{he ? "מידע על ליסינג" : "About leasing"}<Arrow size={18} aria-hidden="true" /></Link></div>
    </section>

    <section id="home-about" className="home-section home-about-section" aria-labelledby="home-about-title"><div className="home-container"><Chapter number="03" label={he ? "נעים להכיר" : "MEET TARGET MOTORS"} title={he ? "לקנות רכב בראש שקט." : "Buy your next car with confidence."} id="home-about-title" /><div className="home-about-grid">
      <Reveal><div className="home-story"><p className="home-eyebrow">{he ? "הסיפור שלנו" : "OUR STORY"}</p><strong className="home-story-year">2016<span aria-hidden="true">.</span></strong><h3>{he ? "קשרים בעולם. בית בירושלים." : "Global connections. A home in Jerusalem."}</h3><p>{he ? "טרגט מוטורס נוסדה ב־2016 על בסיס הניסיון של מייסדיה בשוק הרכב בישראל ובחו״ל. מאז, אנחנו מחברים בין דגמים נבחרים בעולם לבין הנהגים בישראל." : "Founded in 2016, Target Motors grew from its founders’ experience in the Israeli and international car markets. We connect selected vehicles from abroad with drivers here in Israel."}</p><Link to="/about" className="home-text-link">{he ? "עוד על טרגט מוטורס" : "More about Target Motors"}<Arrow size={18} aria-hidden="true" /></Link></div></Reveal>
      <Reveal delay={80}><div className="home-values"><p className="home-eyebrow">{he ? "מה חשוב לנו" : "WHAT MATTERS TO US"}</p>{[
        [he ? "אמינות" : "Reliability", he ? "יחס אישי והתנהלות הוגנת, כדי שתוכלו לבחור בביטחון." : "Personal attention and a fair approach, so you can choose with confidence."],
        [he ? "שקיפות" : "Transparency", he ? "להכיר את המפרט, האפשרויות ותנאי הרכישה לפני שמחליטים." : "Know the specifications, choices and purchase terms before deciding."],
        [he ? "מקצועיות" : "Expertise", he ? "ידע, ניסיון וקשרים בינלאומיים שמלווים כל שלב בדרך לרכב." : "Knowledge, experience and international relationships at every step."],
      ].map(([title, text]) => <div key={title}><Check size={22} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></Reveal>
    </div></div></section>

    <section id="home-contact" className="home-contact" aria-labelledby="home-contact-title"><div className="home-container home-contact-grid">
      <Reveal><div className="home-contact-copy"><p className="home-eyebrow">{he ? "מכאן ממשיכים יחד" : "LET’S TAKE THE NEXT STEP"}</p><h2 id="home-contact-title">{he ? "בואו נמצא את הרכב שלכם." : "Let’s find your next car."}</h2><p>{he ? "ספרו לנו מה אתם מחפשים. נבדוק יחד דגמים, זמינות ואפשרויות רכישה — או נתאם ביקור באולם התצוגה בירושלים." : "Tell us what you are looking for. We’ll explore models, availability and purchase options together — or arrange a visit to our Jerusalem showroom."}</p><div className="home-contact-details"><a href={COMPANY.phoneTel}><Phone size={23} aria-hidden="true" /><div><span>{he ? "שירות ומכירות" : "Sales & service"}</span><strong dir="ltr">{COMPANY.phoneDisplay}</strong></div></a><a href={COMPANY.maps} target="_blank" rel="noreferrer"><MapPin size={23} aria-hidden="true" /><div><span>{he ? "אולם התצוגה" : "The showroom"}</span><strong>{he ? COMPANY.addressHe : COMPANY.addressEn}</strong></div></a><div><Clock3 size={23} aria-hidden="true" /><div><span>{he ? "שעות הפעילות" : "Opening hours"}</span><strong>{he ? COMPANY.hoursHe : COMPANY.hoursEn}</strong></div></div></div><a href={contact} target="_blank" rel="noreferrer" className="home-button home-button-white">{he ? "דברו איתנו בוואטסאפ" : "Chat with us on WhatsApp"}<Arrow size={18} aria-hidden="true" /></a></div></Reveal>
      <div className="home-contact-form"><h3>{he ? "איך אפשר לעזור?" : "How can we help?"}</h3><p>{he ? "מלאו פרטים והמשיכו לשיחה בוואטסאפ." : "Fill in your details to continue the conversation on WhatsApp."}</p><LeadForm /></div>
    </div></section>
  </main>;
}
