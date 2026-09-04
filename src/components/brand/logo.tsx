import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const src = `${import.meta.env.BASE_URL}brand/logo.png`;

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center no-underline", className)} aria-label="טרגט מוטורס">
      <img src={src} alt="טרגט מוטורס" className="h-9 w-auto max-w-[min(52vw,13.5rem)] sm:h-10" />
    </Link>
  );
}
