import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { COMPANY, whatsappHref } from "@/lib/company";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/toyota", key: "toyota" as const },
  { to: "/honda", key: "honda" as const },
  { to: "/financing", key: "financing" as const },
  { to: "/leasing", key: "leasing" as const },
  { to: "/about", key: "about" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-brand focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        {t.skip}
      </a>
      <Header />
      <div id="content" className="flex-1">
        {children}
      </div>
      <Footer />
      <WhatsappFab />
      <Toaster theme="light" position="top-center" richColors={false} />
    </div>
  );
}

function Header() {
  const { t, toggleLang } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={cn("sticky top-0 z-40 bg-chrome text-chrome-fg", scrolled && "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]")}>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:h-[4.25rem] sm:px-8">
        <Logo />
        <nav className="ms-auto hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-chrome-muted transition-colors duration-150 hover:text-chrome-fg",
                pathname.startsWith(item.to) && "text-chrome-fg",
              )}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-1 lg:ms-4">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex h-11 min-w-11 items-center justify-center rounded-md px-3 text-xs font-semibold tracking-wide text-chrome-muted hover:bg-chrome-fg/10 hover:text-chrome-fg"
            aria-label={t.langSwitchAria}
          >
            {t.langSwitch}
          </button>
          <a href={COMPANY.phoneTel} className="hidden h-11 items-center gap-2 rounded-md px-3 text-sm text-chrome-fg hover:bg-chrome-fg/10 sm:inline-flex">
            <Phone className="size-4" />
            {COMPANY.phoneDisplay}
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">{t.quote}</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-chrome-fg hover:bg-chrome-fg/10 lg:hidden"
            aria-expanded={open}
            aria-label={open ? t.close : t.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-chrome-fg/10 bg-chrome px-5 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="rounded-md px-3 py-3 text-base text-chrome-fg hover:bg-chrome-fg/10">
                {t.nav[item.key]}
              </Link>
            ))}
            <a href={COMPANY.phoneTel} className="rounded-md px-3 py-3 text-base text-chrome-fg hover:bg-chrome-fg/10">
              {t.call} {COMPANY.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="mt-auto bg-chrome text-chrome-fg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-chrome-muted">{t.footer.tag}</p>
          <p className="mt-6 text-sm text-chrome-muted">{t.footer.legal}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-chrome-muted">{t.nav.contact}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={COMPANY.phoneTel} className="hover:text-brand">
                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>{lang === "he" ? COMPANY.addressHe : COMPANY.addressEn}</li>
            <li className="text-chrome-muted">{lang === "he" ? COMPANY.hoursHe : COMPANY.hoursEn}</li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-chrome-muted">{t.footer.social}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-brand">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-chrome-fg/10 bg-paper text-ink">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs leading-relaxed text-quiet sm:px-8">{t.footer.disclaimer}</p>
      </div>
    </footer>
  );
}

function WhatsappFab() {
  const { t } = useLanguage();
  return (
    <a
      href={whatsappHref(t.whatsappPrefill)}
      target="_blank"
      rel="noreferrer"
      className="fixed end-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-medium text-accent-foreground shadow-lg sm:end-6 sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zm-7.01 15.24h-.01c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.42 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74 1.49.64 1.87.7 2.54.59.41-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
      </svg>
      <span className="hidden sm:inline">{t.whatsapp}</span>
    </a>
  );
}
