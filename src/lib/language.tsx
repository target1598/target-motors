import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Copy, type Lang } from "@/lib/copy";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Copy;
  toggleLang: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");

  useEffect(() => {
    const saved = window.localStorage.getItem("tm-lang");
    if (saved === "he" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    window.localStorage.setItem("tm-lang", lang);
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "he" ? "rtl" : "ltr",
      t: copy[lang],
      toggleLang: () => setLang((cur) => (cur === "he" ? "en" : "he")),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
