import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const { lang } = useLanguage();
  return (
    <Link to="/" className={cn("flex items-center gap-3 text-inherit no-underline", className)} aria-label="Target Motors">
      <span className="grid size-9 shrink-0 place-items-center" aria-hidden>
        <svg viewBox="0 0 32 32" className="size-8">
          <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="16" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="16" r="3.4" fill="var(--color-brand)" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-wordmark text-[1.15rem] leading-none tracking-[0.04em]">Target Motors</span>
        <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-current/60">
          {lang === "he" ? "טרגט מוטורס" : "Parallel import"}
        </span>
      </span>
    </Link>
  );
}
