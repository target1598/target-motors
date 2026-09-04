export function PageHero({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <header className="bg-chrome text-chrome-fg">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
        {sub ? <p className="mt-4 max-w-2xl text-base text-chrome-muted sm:text-lg">{sub}</p> : null}
      </div>
    </header>
  );
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20 ${className}`}>{children}</section>;
}
