import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { frameCount, hondaSrc, jellySrc, toyotaCombo } from "@/lib/visualizer";

export function CarSpin({ slug, paintId, alt }: { slug: string; paintId: string; alt: string }) {
  const combo = toyotaCombo(slug);
  const total = frameCount(slug);
  const [frame, setFrame] = useState(combo?.catalogFrame ?? 1);
  const [ready, setReady] = useState(0);
  const drag = useRef<{ x: number; start: number } | null>(null);

  const urls = useMemo(() => {
    if (!combo) return [] as string[];
    return Array.from({ length: total }, (_, i) => jellySrc(slug, paintId, i + 1));
  }, [combo, paintId, slug, total]);

  useEffect(() => {
    if (!urls.length) return;
    let live = true;
    setReady(0);
    urls.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (live) setReady((n) => n + 1);
      };
      img.src = src;
    });
    return () => {
      live = false;
    };
  }, [urls]);

  useEffect(() => {
    if (!combo) return;
    setFrame((f) => Math.min(Math.max(1, f), total));
  }, [combo, total]);

  function move(dx: number) {
    const tick = 7;
    const steps = Math.trunc(dx / tick);
    if (!steps) return;
    setFrame((f) => {
      const next = (((f - 1 + steps) % total) + total) % total;
      return next + 1;
    });
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, start: frame };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    move(-dx);
  }
  function onPointerUp() {
    drag.current = null;
  }

  if (!combo) {
    return (
      <div className="grid aspect-[16/9] place-items-center bg-studio text-studio-fg">
        <img src={hondaSrc(slug)} alt={alt} className="size-full object-contain" />
      </div>
    );
  }

  return (
    <div className="relative select-none bg-studio text-studio-fg">
      <div
        className="relative aspect-[16/9] cursor-ew-resize touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {urls.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="absolute inset-0 size-full object-contain"
            style={{ opacity: i + 1 === frame ? 1 : 0 }}
          />
        ))}
        <span className="sr-only">{alt}</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2">
        <button
          type="button"
          className="pointer-events-auto grid size-11 place-items-center rounded-full bg-ink/80 text-paper"
          onClick={() => setFrame((f) => ((f - 2 + total) % total) + 1)}
          aria-label="Previous angle"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto grid size-11 place-items-center rounded-full bg-ink/80 text-paper"
          onClick={() => setFrame((f) => (f % total) + 1)}
          aria-label="Next angle"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      {ready < total ? (
        <p className="absolute start-4 top-4 text-[11px] uppercase tracking-wider text-quiet">
          {ready}/{total}
        </p>
      ) : null}
    </div>
  );
}
