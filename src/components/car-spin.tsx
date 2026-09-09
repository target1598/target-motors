import { ChevronLeft, ChevronRight, Maximize2, Minimize2, RotateCcw, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { clampStudioView, INITIAL_STUDIO_VIEW, pinchStudioView, type StudioPoint, type StudioView } from "@/lib/studio-zoom";

type StudioGesture =
  | { kind: "pinch"; view: StudioView; anchor: StudioPoint; distance: number }
  | { kind: "pan"; view: StudioView; point: StudioPoint };

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
  const [zoomView, setZoomView] = useState(INITIAL_STUDIO_VIEW);
  const [grabbing, setGrabbing] = useState(false);
  const drag = useRef<{ x: number; leftover: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef(INITIAL_STUDIO_VIEW);
  const pointers = useRef(new Map<number, StudioPoint>());
  const gesture = useRef<StudioGesture | null>(null);
  const updateView = useCallback((next: StudioView) => {
    viewRef.current = next;
    setZoomView((previous) => previous.scale === next.scale && previous.x === next.x && previous.y === next.y ? previous : next);
  }, []);
  const step = useCallback((delta: number) => {
    setFrame((f) => ((((f - 1 + delta) % total) + total) % total) + 1);
  }, [total]);

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
  }, [expanded, step]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!zoomable || !stage) return;
    const resize = () => updateView(clampStudioView(viewRef.current, { width: stage.clientWidth, height: stage.clientHeight }));
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [expanded, zoomable, updateView]);

  const canSpin = urls.length > 1;

  function rebaseGesture() {
    const points = [...pointers.current.values()];
    drag.current = null;
    gesture.current = null;
    if (points.length >= 2) {
      const rect = stageRef.current!.getBoundingClientRect();
      gesture.current = {
        kind: "pinch", view: viewRef.current,
        anchor: { x: (points[0].x + points[1].x) / 2 - rect.left - rect.width / 2, y: (points[0].y + points[1].y) / 2 - rect.top - rect.height / 2 },
        distance: Math.max(1, Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)),
      };
    } else if (points.length === 1) {
      if (viewRef.current.scale > 1) gesture.current = { kind: "pan", view: viewRef.current, point: points[0] };
      else if (canSpin) drag.current = { x: points[0].x, leftover: 0 };
    }
    setGrabbing(points.length > 0);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!canSpin && !zoomable) return;
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (zoomable) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      rebaseGesture();
      return;
    }
    drag.current = { x: e.clientX, leftover: 0 };
    setGrabbing(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (zoomable && !pointers.current.has(e.pointerId)) return;
    if (zoomable && pointers.current.has(e.pointerId)) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const active = gesture.current;
      const rect = stageRef.current!.getBoundingClientRect();
      const size = { width: rect.width, height: rect.height };
      if (active?.kind === "pinch") {
        const [a, b] = [...pointers.current.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const anchor = { x: (a.x + b.x) / 2 - rect.left - rect.width / 2, y: (a.y + b.y) / 2 - rect.top - rect.height / 2 };
        updateView(pinchStudioView(active.view, active.view.scale * distance / active.distance, active.anchor, anchor, size));
        return;
      }
      if (active?.kind === "pan") {
        updateView(clampStudioView({ ...active.view, x: active.view.x + e.clientX - active.point.x, y: active.view.y + e.clientY - active.point.y }, size));
        return;
      }
    }
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

  function onPointerUp(e: React.PointerEvent) {
    if (zoomable) {
      if (!pointers.current.delete(e.pointerId)) return;
      rebaseGesture();
      return;
    }
    drag.current = null;
    setGrabbing(false);
  }

  function onPointerCancel() {
    pointers.current.clear();
    gesture.current = null;
    drag.current = null;
    setGrabbing(false);
  }

  const still = stillSrc || (interior ? interiorSrc(slug, interiorId!, 1) : !combo ? hondaSrc(slug) : null);
  const nativeAspect = pngTurntable && combo?.aspect;
  const carStyle = showroom
    ? {
        width: zoomable ? `var(--car-showroom-fit, ${fit * 100}%)` : `${fit * 100}%`,
        height: "auto",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }
    : {
        width: `${fit * 100}%`,
        height: `${fit * 100}%`,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
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
        style={expanded && showroom && combo?.aspect ? { aspectRatio: zoomable ? "var(--car-expanded-aspect, 2 / 1)" : combo.aspect } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onLostPointerCapture={onPointerUp}
      >
        <div className="pointer-events-none absolute inset-0" style={zoomable ? { transform: `translate(${zoomView.x}px, ${zoomView.y}px) scale(${zoomView.scale})` } : undefined}>
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
        </div>
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
          <button type="button" className="absolute bottom-2 left-2 z-20 grid size-11 place-items-center rounded-full text-neutral-800 focus-visible:outline-2 focus-visible:outline-red-600 sm:bottom-4 sm:left-4"
            aria-label={zoomView.scale > 1 ? (lang === "he" ? "איפוס הגדלה" : "Reset zoom") : (lang === "he" ? "הגדלת התמונה" : "Zoom in")}
            onClick={() => updateView(zoomView.scale > 1 ? INITIAL_STUDIO_VIEW : { scale: 1.75, x: 0, y: 0 })}>
            <span className="grid size-8 place-items-center rounded-full border border-white/60 bg-white/25 shadow-sm backdrop-blur-md">
              {zoomView.scale > 1 ? <RotateCcw className="size-4" /> : <ZoomIn className="size-4" />}
            </span>
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn("absolute z-10 grid size-11 place-items-center text-neutral-700 hover:text-black", zoomable ? "right-2 bottom-2 sm:right-4 sm:bottom-4" : "right-4 bottom-4 sm:right-6 sm:bottom-6")}
          aria-label={expanded ? t.car.exitFullscreen : t.car.fullscreen}
        >
          <span className={cn("grid size-8 place-items-center", zoomable && "rounded-full border border-white/60 bg-white/25 shadow-sm backdrop-blur-md")}>
            {expanded ? <Minimize2 className={zoomable ? "size-4" : "size-5"} strokeWidth={1.6} /> : <Maximize2 className={zoomable ? "size-4" : "size-5"} strokeWidth={1.6} />}
          </span>
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
