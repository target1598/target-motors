import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  frameAngle,
  frameCount,
  hondaSrc,
  interiorSrc,
  jellySrc,
  toyotaCombo,
} from "@/lib/visualizer";

import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

export function CarSpin({
  slug,
  paintId,
  alt,
  mode = "exterior",
  interiorId,
  stillSrc,
  trimId,
}: {
  slug: string;
  paintId: string;
  alt: string;
  mode?: "exterior" | "interior";
  interiorId?: string;
  stillSrc?: string | null;
  trimId?: string;
}) {
  const { t } = useLanguage();
  const combo = toyotaCombo(slug, paintId, trimId);
  const interior = mode === "interior" && interiorId;
  const total = interior ? 1 : frameCount(slug, paintId, trimId);
  const fit = 1;
  const pngTurntable = combo?.ext === "png";

  const [frame, setFrame] = useState(interior ? 1 : (combo?.catalogFrame ?? 1));
  const [expanded, setExpanded] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const drag = useRef<{ x: number; leftover: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const urls = useMemo(() => {
    if (stillSrc || interior) return [] as string[];
    if (!combo) return [] as string[];
    return Array.from({ length: total }, (_, i) => jellySrc(slug, paintId, i + 1, trimId));
  }, [combo, interior, paintId, slug, stillSrc, total, trimId]);

  useEffect(() => {
    if (!urls.length) return;
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [urls]);

  useEffect(() => {
    if (interior) {
      setFrame(1);
      return;
    }
    setFrame(combo?.catalogFrame ?? 1);
  }, [interior, interiorId, paintId, slug, trimId, combo?.catalogFrame]);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, total]);

  function step(delta: number) {
    setFrame((f) => ((((f - 1 + delta) % total) + total) % total) + 1);
  }

  const canSpin = urls.length > 1;
  const angle = frameAngle(slug, paintId, frame, trimId);

  function onPointerDown(e: React.PointerEvent) {
    if (!canSpin) return;
    if ((e.target as HTMLElement).closest("button")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, leftover: 0 };
    setGrabbing(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current || !canSpin) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    drag.current.leftover += -dx;
    const width = stageRef.current?.clientWidth ?? 800;
    // Short swipe still turns the car; a full-width drag is a bit over one rotation.
    const tick = Math.max(10, Math.round(width / (total * 3)));
    const steps = Math.trunc(drag.current.leftover / tick);
    if (!steps) return;
    drag.current.leftover -= steps * tick;
    step(steps);
  }

  function onPointerUp() {
    drag.current = null;
    setGrabbing(false);
  }

  const still = stillSrc || (interior ? interiorSrc(slug, interiorId!, 1) : !combo ? hondaSrc(slug) : null);
  const nativeAspect = !expanded && pngTurntable && combo?.aspect;

  const stage = (
    <div
      className={cn(
        "relative overflow-hidden select-none bg-studio text-studio-fg",
        expanded
          ? "fixed inset-0 z-[60] flex flex-col"
          : nativeAspect
            ? "w-full"
            : "min-h-[48vh] sm:min-h-[54vh] lg:min-h-[60vh]",
      )}
      style={nativeAspect ? { aspectRatio: combo!.aspect } : undefined}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative overflow-hidden touch-none",
          expanded
            ? "h-full w-full"
            : nativeAspect
              ? "h-full w-full"
              : "min-h-[48vh] sm:min-h-[54vh] lg:min-h-[60vh]",
          canSpin ? (grabbing ? "cursor-grabbing" : "cursor-grab") : "cursor-default",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {still ? (
          <img
            src={still}
            alt={alt}
            draggable={false}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
            style={{ width: `${fit * 100}%`, height: `${fit * 100}%` }}
          />
        ) : (
          urls.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              draggable={false}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
              style={{
                opacity: i + 1 === frame ? 1 : 0,
                width: `${fit * 100}%`,
                height: `${fit * 100}%`,
              }}
            />
          ))
        )}
        <span className="sr-only">{alt}</span>

        {canSpin ? (
          <>
            <NavButton side="left" label={t.car.prevAngle} onClick={() => step(-1)}>
              <ChevronLeft className="size-5" strokeWidth={1.75} />
            </NavButton>
            <NavButton side="right" label={t.car.nextAngle} onClick={() => step(1)}>
              <ChevronRight className="size-5" strokeWidth={1.75} />
            </NavButton>
          </>
        ) : null}

        {angle != null ? (
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-xs tracking-wide text-neutral-500 sm:bottom-6">
            {`${angle}°`}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="absolute right-4 bottom-4 z-10 grid size-11 place-items-center text-neutral-700 hover:text-black sm:right-6 sm:bottom-6"
          aria-label={expanded ? t.car.exitFullscreen : t.car.fullscreen}
        >
          {expanded ? <Minimize2 className="size-5" strokeWidth={1.6} /> : <Maximize2 className="size-5" strokeWidth={1.6} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {expanded ? (
        <div
          className={cn("bg-studio", nativeAspect ? "w-full" : "min-h-[48vh] sm:min-h-[54vh] lg:min-h-[60vh]")}
          style={nativeAspect ? { aspectRatio: combo!.aspect } : undefined}
          aria-hidden
        />
      ) : null}
      {expanded && typeof document !== "undefined" ? createPortal(stage, document.body) : stage}
    </>
  );
}

function NavButton({
  side,
  label,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-black/18 bg-white text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-colors hover:bg-neutral-50 sm:size-11",
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5",
      )}
    >
      {children}
    </button>
  );
}
