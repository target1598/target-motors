import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CircleGauge, Leaf, ShieldCheck, Smartphone, Users } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { carBySlug, interiorsForTrim } from "@/lib/cars";
import { whatsappHref } from "@/lib/company";
import { SIENNA_GRADES, SIENNA_PHOTOS, SIENNA_SOURCES, SIENNA_SPECIFICATIONS } from "@/lib/sienna";
import { observeSiennaMotion, type SiennaMotion } from "@/lib/sienna-motion";
import "./sienna-overview.css";

const car = carBySlug("sienna")!;
const photo = (file: string) => `${import.meta.env.BASE_URL}images/sienna/${file}.webp`;

function Reveal({ children, motion = "rise", delay = 0, className = "" }: { children: ReactNode; motion?: SiennaMotion; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !contentRef.current) return;
    return observeSiennaMotion(ref.current, contentRef.current, motion, delay);
  }, [motion, delay]);
  return <div ref={ref} className={`sienna-reveal ${className}`} data-motion={motion}><div ref={contentRef} className="sienna-reveal-content">{children}</div></div>;
}

function ChapterHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return <Reveal className="sienna-section-heading"><header className="sienna-title-panel"><span className="sienna-chapter-number" aria-hidden="true">{number}</span><div><p className="sienna-kicker">{label}</p><h2>{title}</h2></div></header></Reveal>;
}

export function SiennaOverview() {
  const { lang, dir } = useLanguage();
  const he = lang === "he";
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const quote = whatsappHref(he ? "שלום, אשמח לקבל פרטים והצעה לטויוטה סיינה 2026." : "Hi, I would like more information and a quote for the 2026 Toyota Sienna.");
  return <main className="sienna-overview" dir={dir}>
    <nav className="sienna-model-nav sienna-container" aria-label={he ? "ניווט סיינה" : "Sienna navigation"}>
      <div><Link to="/toyota">Toyota</Link><span>/</span><span aria-current="page">Sienna</span></div>
      <Link className="sienna-studio-link" to="/toyota/sienna/studio">{he ? "לסטודיו סיינה" : "Sienna studio"}<Arrow size={18} /></Link>
    </nav>
    <section className="sienna-hero-panel" aria-labelledby="sienna-title"><div className="sienna-hero sienna-container">
      <div className="sienna-hero-copy">
        <div className="sienna-hero-heading">
        <p className="sienna-kicker">TOYOTA / HYBRID / 2026</p>
        <h1 id="sienna-title" lang="en">SIENNA<span>.</span></h1>
        </div>
        <div className="sienna-hero-intro">
        <h2>{he ? "מקום לכל מה שחשוב." : "Room for what matters."}</h2>
        <p>{he ? "שבעה או שמונה מקומות, הנעה היברידית בכל גרסה, ואפשרויות נוחות שמתאימות לחיים שלכם. הכירו את הסיינה מקרוב." : "Seven or eight seats, hybrid power in every version, and comfort choices for the way you travel. Get to know the Sienna."}</p>
        <div className="sienna-actions"><a className="sienna-button sienna-button-red" href="#sienna-trims">{he ? "גלו את רמות הגימור" : "Explore the trims"}<Arrow size={18} /></a><Link className="sienna-button sienna-button-light" to="/toyota/sienna/studio">{he ? "צפייה בסטודיו" : "View in studio"}<ArrowUpRight size={18} /></Link></div>
        </div>
      </div>
      <figure className="sienna-hero-photo"><picture><source media="(max-width: 700px)" srcSet={photo("hero-heavy-metal-mobile")} width="800" height="812" /><img src={photo("hero-heavy-metal")} width="1800" height="629" fetchPriority="high" alt={he ? "טויוטה סיינה Limited בצבע כסוף בנסיעה בכביש לצד הרים ויערות" : "Silver Toyota Sienna Limited driving along a mountain road"} /></picture><figcaption>{he ? "סיינה Limited · צילום: Toyota Canada" : "Sienna Limited · Photography: Toyota Canada"}</figcaption></figure>
    </div></section>
    <div className="sienna-facts-panel"><dl className="sienna-facts sienna-container">
      {[
        ["245", he ? "כ״ס — הספק מערכת משולב" : "hp · combined system output"],
        ["7 / 8", he ? "מקומות, לפי רמת הגימור" : "seats, depending on trim"],
        ["FWD / AWD", he ? "הנעה קדמית או כפולה" : "front-wheel or all-wheel drive"],
        ["6.6 / 6.8", he ? "ל׳ ל־100 ק״מ · FWD / AWD*" : "L/100 km · FWD / AWD*"],
      ].map(([value, label]) => <div key={value}><dt>{label}</dt><dd dir="ltr">{value}</dd></div>)}
    </dl></div>
    <p className="sienna-footnote sienna-container">{he ? "*נתוני צריכה משולבת לפי תקן קנדי. הצריכה בפועל תלויה בתנאי הדרך ובאופן הנהיגה." : "*Canadian combined fuel-consumption ratings. Actual consumption varies with conditions and driving habits."}</p>
    <nav className="sienna-chapters sienna-container" aria-label={he ? "תוכן עמוד סיינה" : "On this page"}>
      {[["space", he ? "מרחב ונוחות" : "Space & comfort"], ["trims", he ? "רמות גימור" : "Trims"], ["gallery", he ? "גלריה" : "Gallery"], ["safety", he ? "בטיחות" : "Safety"], ["specs", he ? "מפרט" : "Specifications"]].map(([id, label]) => <a key={id} href={`#sienna-${id}`}>{label}</a>)}
    </nav>

    <section id="sienna-space" className="sienna-section sienna-container">
      <ChapterHeading number="01" label={he ? "מרחב לחיים" : "SPACE FOR LIFE"} title={he ? "לכל אחד המקום שלו." : "Everyone gets their own space."} />
      <div className="sienna-space">
      <Reveal motion="image" className="sienna-space-image"><figure><img src={photo("cabin")} alt={he ? "מושבי קפטן בשורה השנייה של סיינה XSE, לצד דלת הזזה פתוחה" : "Sienna XSE second-row captain’s chairs beside an open sliding door"} width="1280" height="1024" loading="lazy" /><figcaption>{he ? "מושבי קפטן בשורה השנייה · XSE" : "Second-row captain’s chairs · XSE"}</figcaption></figure></Reveal>
      <Reveal className="sienna-space-copy">
        <p>{he ? "ב־LE וב־XLE יש מקום לשמונה. גרסאות XSE, Limited ו־Platinum מציעות שבעה מקומות עם שני מושבי קפטן נפרדים בשורה השנייה." : "LE and XLE seat eight. XSE, Limited and Platinum seat seven, with two individual captain’s chairs in the second row."}</p>
        <div className="sienna-space-options"><div><Users size={22} /><strong>{he ? "8 מקומות" : "8 seats"}</strong><span>LE / XLE</span></div><div><Users size={22} /><strong>{he ? "7 מקומות" : "7 seats"}</strong><span>XSE / Limited / Platinum</span></div></div>
        <p>{he ? "השורה השלישית מתקפלת בחלוקה של 60:40. מאחוריה יש 949 ליטר למטען, ועד 2,129 ליטר מאחורי השורה השנייה, לפי המפרט הקנדי." : "The third row folds in a 60:40 split. Canadian specifications list 949 litres behind the third row and up to 2,129 litres behind the second."}</p>
        <a className="sienna-text-link" href="#sienna-trims">{he ? "השוו בין האפשרויות" : "Compare the options"}<Arrow size={18} /></a>
      </Reveal>
      </div>
    </section>

    <section className="sienna-band" aria-label={he ? "הנעה וטכנולוגיה" : "Power and technology"}>
      <div className="sienna-container sienna-benefits">
        {[
          { Icon: Leaf, tag: "HYBRID", title: he ? "היברידית בכל גרסה" : "Hybrid in every version", text: he ? "מנוע 2.5 ליטר ומנועים חשמליים, עם 245 כ״ס משולבים וללא צורך בחיבור לטעינה." : "A 2.5-litre engine and electric motors deliver 245 combined horsepower, without plugging in." },
          { Icon: CircleGauge, tag: "AWD", title: he ? "אחיזה לפי הצורך" : "Traction on demand", text: he ? "הנעת AWD האלקטרונית מפעילה את הגלגלים האחוריים לפי תנאי הנהיגה. זמינה ברמות גימור נבחרות." : "Electronic on-demand AWD supplies rear-wheel assistance as driving conditions require. Available on selected trims." },
          { Icon: Smartphone, tag: "CONNECTED", title: he ? "הטלפון משתלב בנסיעה" : "Your phone, connected", text: he ? "Apple CarPlay ו־Android Auto אלחוטיים וטעינה אלחוטית. מסך 8 אינץ׳ ב־LE או 12.3 אינץ׳ בגרסאות האחרות." : "Wireless Apple CarPlay, Android Auto and wireless charging. An 8-inch screen in LE, or 12.3 inches in the other grades." },
        ].map(({ Icon, tag, title, text }, i) => <Reveal key={tag} delay={i * 80}><div className="sienna-benefit"><div><Icon size={25} /><span>{tag}</span></div><h3>{title}</h3><p>{text}</p></div></Reveal>)}
      </div>
    </section>

    <section id="sienna-trims" className="sienna-section sienna-range"><div className="sienna-container">
      <ChapterHeading number="02" label={he ? "רמות גימור" : "THE RANGE"} title={he ? "מה הסיינה שלכם צריכה לכלול?" : "What matters in your Sienna?"} />
      <p>{he ? "השוו בין הגימורים והחבילות. כל קישור לסטודיו פותח את הגרסה המתאימה לצפייה בצבעי המרכב ובתא הנוסעים." : "Compare grades and packages. Each studio link opens that exact version so you can explore its exterior colors and cabin."}</p>
      <div className="sienna-grade-grid">
        {SIENNA_GRADES.map((grade, i) => {
          const interiors = interiorsForTrim(car, grade.variants[0].id);
          return <Reveal key={grade.id} motion="card" delay={(i % 3) * 80}>
            <article className="sienna-grade" aria-labelledby={`grade-${grade.id}`}>
              <header className="sienna-grade-heading"><div className="sienna-grade-top"><span>{grade.packageFor ? (he ? `חבילה על בסיס ${grade.packageFor}` : `Package for ${grade.packageFor}`) : (he ? "רמת גימור" : "GRADE")}</span></div>
              <h3 id={`grade-${grade.id}`} dir="ltr">{grade.name}</h3></header><h4>{grade.title[lang]}</h4><p>{grade.description[lang]}</p>
              <dl className="sienna-grade-facts"><div><dt>{he ? "מקומות" : "Seats"}</dt><dd>{grade.seats}</dd></div><div><dt>{he ? "הנעה" : "Drive"}</dt><dd dir="ltr">{grade.drive}</dd></div><div><dt>{he ? "מסך" : "Screen"}</dt><dd dir="ltr">{grade.screen}</dd></div></dl>
              <details className="sienna-finish-details"><summary>{he ? "אבזור ואפשרויות פנים" : "Equipment & interior options"}<ChevronDown size={17} /></summary><div className="sienna-equipment-content">
                <ul>{grade.features.map(feature => <li key={feature.en}><Check size={16} /><span>{feature[lang]}</span></li>)}<li><Check size={16} /><span>{he ? `מערכת שמע: ${grade.audio} רמקולים` : `${grade.audio} speakers`}</span></li></ul>
                <h5>{he ? "אפשרויות ריפוד וצבע פנים" : "Upholstery and interior colors"}</h5>
                {interiors.map(interior => <p key={interior.id}><span style={{ background: interior.hex }} aria-hidden="true" />{interior.name[lang]}</p>)}
              </div></details>
              <div className="sienna-grade-links">{grade.variants.map(variant => <Link key={variant.id} to="/toyota/sienna/studio" search={{ trim: variant.id }}><span><span dir="ltr">{variant.label}</span><small>{he ? "צפייה בסטודיו" : "View in studio"}</small></span><Arrow size={19} /></Link>)}</div>
            </article>
          </Reveal>;
        })}
      </div>
    </div></section>

    <section id="sienna-gallery" className="sienna-section sienna-gallery-section">
      <div className="sienna-container"><ChapterHeading number="03" label={he ? "מבט מקרוב" : "A CLOSER LOOK"} title={he ? "הפרטים של היום־יום." : "The details of daily life."} /><p className="sienna-section-intro">{he ? "תמונות מקוריות של דגמי 2026 מ־Toyota Canada." : "Official 2026 photography from Toyota Canada."}</p>
        <div className="sienna-photo-grid">{SIENNA_PHOTOS.map((item, i) => <Reveal key={item.file} motion="image" className={i === 0 ? "sienna-photo-wide" : ""}><figure><img src={photo(item.file)} width={item.width} height={item.height} alt={item.alt[lang]} loading="lazy" /><figcaption><span>{item.caption[lang]}</span><span>{he ? "האבזור תלוי בגימור" : "Equipment varies by grade"}</span></figcaption></figure></Reveal>)}</div>
      </div>
    </section>

    <section id="sienna-safety" className="sienna-section sienna-container">
      <ChapterHeading number="04" label={he ? "בטיחות" : "SAFETY"} title={he ? "עזרה נוספת בדרך." : "Another layer of support."} />
      <div className="sienna-safety">
      <Reveal><p>{he ? "Toyota Safety Sense 2.0 בכל גרסאות הסיינה, לצד ניטור שטחים מתים, התרעה על תנועה חוצה מאחור ו־10 כריות אוויר." : "Toyota Safety Sense 2.0 across the range, alongside blind-spot monitoring, rear cross-traffic alert and 10 airbags."}</p><div className="sienna-safety-seal"><ShieldCheck size={34} /><div><strong>TOYOTA SAFETY SENSE</strong><span>2.0</span></div></div><p className="sienna-small">{he ? "מערכות הסיוע תומכות בנהג ואינן מחליפות נהיגה קשובה. פעולתן תלויה בתנאים ובמגבלות המערכת." : "Driver-assistance systems support attentive driving. Their operation is subject to conditions and system limitations."}</p></Reveal>
      <Reveal className="sienna-safety-list"><ul>{[
        [he ? "התרעה לפני התנגשות" : "Pre-collision support", he ? "עם זיהוי הולכי רגל ורוכבי אופניים" : "With pedestrian and bicycle detection"],
        [he ? "בקרת שיוט אדפטיבית" : "Adaptive cruise control", he ? "מערכת רדאר הפועלת בטווח מהירויות מלא" : "Full-speed-range dynamic radar cruise control"],
        [he ? "סיוע בשמירה על הנתיב" : "Lane assistance", he ? "התרעה על סטייה, סיוע בהיגוי ומעקב נתיב" : "Departure alert, steering assistance and lane tracing"],
        [he ? "אור גבוה אוטומטי" : "Automatic high beams", he ? "מעבר בין אורות לפי תנאי הדרך" : "High-beam switching as conditions allow"],
        [he ? "תזכורת מתקדמת למושב האחורי" : "Advanced Rear Seat Reminder", he ? "חיישן לזיהוי תנועה בשורות האחוריות, בכפוף למגבלות" : "Rear-row movement sensing, subject to detection limits"],
      ].map(([title, sub]) => <li key={title}><Check size={18} /><div><h3>{title}</h3><p>{sub}</p></div></li>)}</ul></Reveal>
      </div>
    </section>

    <section className="sienna-mobility sienna-container" aria-labelledby="sienna-mobility-title"><Reveal><div className="sienna-mobility-heading"><div><p className="sienna-kicker">MOBILITY / {he ? "אפשרויות נגישות" : "ACCESSIBILITY"}</p><h2 id="sienna-mobility-title">{he ? "סיינה, גם לצרכים אחרים." : "Sienna for different mobility needs."}</h2></div><a className="sienna-text-link" href={quote} target="_blank" rel="noopener noreferrer">{he ? "דברו איתנו על התאמה" : "Discuss your requirements"}<Arrow size={18} /></a></div><p>{he ? "Toyota Canada מציעה גרסאות המוכנות להסבות של BraunAbility או VMI: LE ו־XLE בהנעה קדמית, וכן LE AWD ו־XSE AWD דרך VMI. הכנה להסבה אינה כוללת בהכרח רמפה או מושב נגיש מותקן. ההסבה, מספר המושבים והזמינות בישראל נבדקים לרכב הספציפי." : "Toyota Canada offers conversion-ready versions for BraunAbility or VMI: front-wheel-drive LE and XLE, plus LE AWD and XSE AWD through VMI. Conversion-ready does not mean a ramp or accessible seat is already installed. Conversion details, final seating and Israeli availability must be confirmed for the individual vehicle."}</p><div className="sienna-mobility-links">{[{ id: "le-fwd-mobility", name: "LE FWD" }, { id: "le-awd-mobility", name: "LE AWD" }, { id: "xle-mobility", name: "XLE FWD" }, { id: "xse-mobility", name: "XSE AWD" }].map(item => <Link key={item.id} to="/toyota/sienna/studio" search={{ trim: item.id }}><span dir="ltr">{item.name} Mobility</span><span>{he ? "מבט חיצוני" : "Exterior preview"}</span><Arrow size={16} /></Link>)}</div></Reveal></section>

    <section id="sienna-specs" className="sienna-section sienna-container"><ChapterHeading number="05" label={he ? "מפרט" : "SPECIFICATIONS"} title={he ? "כל המספרים במקום אחד." : "The numbers, together."} /><div className="sienna-spec-section"><Reveal><p>{he ? "נתוני דגמי 2026 במפרט קנדי, ללא הסבות נגישות." : "Canadian 2026 specifications, before any mobility conversion."}</p><a className="sienna-text-link" href={SIENNA_SOURCES.specifications} target="_blank" rel="noopener noreferrer">{he ? "למפרט המלא של Toyota Canada" : "Full Toyota Canada specification"}<ArrowUpRight size={18} /></a></Reveal><Reveal motion="card" delay={100}><dl className="sienna-spec-table">{SIENNA_SPECIFICATIONS.map(([label, value]) => <div key={label.en}><dt>{label[lang]}</dt><dd>{value[lang]}</dd></div>)}</dl></Reveal></div></section>

    <section className="sienna-contact"><div className="sienna-container"><div><p className="sienna-kicker">TARGET MOTORS / SIENNA</p><h2>{he ? "הכירו אותה. מכל זווית." : "Get to know it. From every angle."}</h2><p>{he ? "המשיכו לסטודיו לבחירת גימור וצבע לצפייה, או דברו איתנו על הרכב שמתאים לכם." : "Explore a trim and color in the studio, or talk to us about the Sienna that suits you."}</p></div><div className="sienna-actions"><Link className="sienna-button sienna-button-red" to="/toyota/sienna/studio">{he ? "לסטודיו סיינה" : "Sienna studio"}<Arrow size={18} /></Link><a className="sienna-button sienna-button-light" href={quote} target="_blank" rel="noopener noreferrer">{he ? "פרטים והצעת מחיר" : "Information & a quote"}</a></div></div></section>
    <aside className="sienna-sources sienna-container" aria-label={he ? "מקורות והערות" : "Sources and notes"}><p>{he ? "המידע מבוסס על מפרט Toyota Canada לשנת 2026. אבזור וזמינות ברכב המיובא יאושרו בהצעה פרטנית. שירותים מקושרים ותכונות התלויות ברשת עשויים להשתנות לפי מדינה, מכשיר ומנוי. התמונות להמחשה ומציגות גימורים שונים." : "Based on Toyota Canada’s 2026 specification. Imported-vehicle equipment and availability are confirmed in an individual quotation. Connected services and network-dependent features vary by country, device and subscription. Photographs show different grades."}</p><div><span>{he ? "מידע ותמונות: Toyota Canada" : "Information & photography: Toyota Canada"}</span><a href={SIENNA_SOURCES.overview} target="_blank" rel="noopener noreferrer">{he ? "דף הדגם" : "Model overview"}</a><a href={SIENNA_SOURCES.features} target="_blank" rel="noopener noreferrer">{he ? "אבזור ותכונות" : "Features"}</a><a href={SIENNA_SOURCES.release} target="_blank" rel="noopener noreferrer">{he ? "עדכוני 2026" : "2026 model details"}</a></div></aside>
  </main>;
}
