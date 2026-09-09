import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  frameCount,
  hondaSrc,
  interiorSrc,
  jellySrc,
  showroomSrc,
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
  aspectRatio,
  zoomable = false,
}: {
  slug: string;
  paintId: string;
  alt: string;
  mode?: "exterior" | "interior";
  interiorId?: string;
  stillSrc?: string | null;
  trimId?: string;
  aspectRatio?: string;
  zoomable?: boolean;
}) {
  const { t, lang } = useLanguage();
  const combo = toyotaCombo(slug, paintId, trimId);
  const interior = mode === "interior" && interiorId;
  const total = interior ? 1 : frameCount(slug, paintId, trimId);
  const pngTurntable = combo?.ext === "png";
  const showroom = Boolean(combo?.showroom) && !interior && !stillSrc;
  const fit = showroom ? (combo?.fit ?? 0.55) : 1;

  const [frame, setFrame] = useState(interior ? 1 : (combo?.catalogFrame ?? 1));
  const [expanded, setExpanded] = useState(false);
  const [magnification, setMagnification] = useState(1);
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
  const carStyle = showroom
    ? {
        width: zoomable ? `var(--car-showroom-fit, ${fit * 100}%)` : `${fit * 100}%`,
        height: "auto",
        top: "60%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${zoomable ? magnification : 1})`,
      }
    : {
        width: `${fit * 100}%`,
        height: `${fit * 100}%`,
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${zoomable ? magnification : 1})`,
      };

  const stage = (
    <div
      className={cn(
        "relative overflow-hidden select-none text-studio-fg",
        zoomable && "car-spin-zoomable",
        showroom ? "bg-black" : "bg-studio",
        expanded
          ? "fixed inset-0 z-[60] flex items-center justify-center"
          : nativeAspect
            ? "w-full"
            : "min-h-[48vh] sm:min-h-[54vh] lg:min-h-[60vh]",
      )}
      style={!expanded && nativeAspect ? { aspectRatio: aspectRatio ?? combo!.aspect } : undefined}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative overflow-hidden touch-none",
          expanded
            ? showroom
              ? "h-auto w-full max-h-full"
              : "h-full w-full"
            : nativeAspect
              ? "h-full w-full"
              : "min-h-[48vh] sm:min-h-[54vh] lg:min-h-[60vh]",
          canSpin ? (grabbing ? "cursor-grabbing" : "cursor-grab") : "cursor-default",
        )}
        style={expanded && showroom && combo?.aspect ? { aspectRatio: combo.aspect } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {showroom ? (
          <img
            src={showroomSrc()}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        {still ? (
          <img
            src={still}
            alt={alt}
            draggable={false}
            className="absolute object-contain"
            style={carStyle}
          />
        ) : (
          urls.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              draggable={false}
              className="absolute object-contain"
              style={{
                ...carStyle,
                opacity: i + 1 === frame ? 1 : 0,
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

        {zoomable ? (
          <div className="absolute bottom-2 left-2 z-20 flex items-center rounded-xl border border-black/15 bg-white text-neutral-800 shadow-sm sm:bottom-4 sm:left-4" dir="ltr" role="group" aria-label={lang === "he" ? "הגדלת תצוגת הרכב" : "Car zoom"}>
            <button type="button" className="grid size-11 place-items-center rounded-l-xl hover:bg-neutral-100 disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-red-600" aria-label={lang === "he" ? "הקטנת התמונה" : "Zoom out"} disabled={magnification <= 1} onClick={() => setMagnification((value) => Math.max(1, value - .25))}>
              <ZoomOut className="size-5" />
            </button>
            <button type="button" className="min-h-11 min-w-11 px-1 text-xs font-semibold hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-red-600" aria-label={lang === "he" ? "איפוס הגדלה" : "Reset zoom"} onClick={() => setMagnification(1)}>
              {magnification.toFixed(2).replace(/\.?0+$/, "")}×
            </button>
            <button type="button" className="grid size-11 place-items-center rounded-r-xl hover:bg-neutral-100 disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-red-600" aria-label={lang === "he" ? "הגדלת התמונה" : "Zoom in"} disabled={magnification >= 2} onClick={() => setMagnification((value) => Math.min(2, value + .25))}>
              <ZoomIn className="size-5" />
            </button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn("absolute right-4 bottom-4 z-10 grid size-11 place-items-center text-neutral-700 hover:text-black sm:right-6 sm:bottom-6", zoomable && "rounded-xl border border-black/15 bg-white shadow-sm")}
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
          style={nativeAspect ? { aspectRatio: aspectRatio ?? combo!.aspect } : undefined}
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
