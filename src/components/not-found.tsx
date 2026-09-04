import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

export function NotFound() {
  const { t } = useLanguage();
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="text-4xl font-medium">{t.notFound.title}</h1>
      <p className="text-muted">{t.notFound.body}</p>
      <Button asChild>
        <Link to="/">{t.heroCta}</Link>
      </Button>
    </main>
  );
}
