export type StudioPoint = { x: number; y: number };
export type StudioSize = { width: number; height: number };
export type StudioView = StudioPoint & { scale: number };

export const INITIAL_STUDIO_VIEW: StudioView = { scale: 1, x: 0, y: 0 };

/** Keep the enlarged scene over the entire frame, including after a window resize. */
export function clampStudioView(view: StudioView, size: StudioSize): StudioView {
  const scale = Math.min(2.5, Math.max(1, view.scale));
  const maxX = Math.max(0, size.width * (scale - 1) / 2);
  const maxY = Math.max(0, size.height * (scale - 1) / 2);
  return {
    scale,
    x: Math.max(-maxX, Math.min(maxX, view.x)),
    y: Math.max(-maxY, Math.min(maxY, view.y)),
  };
}

/** Anchors are relative to the frame center; the point between the fingers stays under them. */
export function pinchStudioView(
  start: StudioView,
  scale: number,
  startAnchor: StudioPoint,
  currentAnchor: StudioPoint,
  size: StudioSize,
): StudioView {
  const nextScale = Math.min(2.5, Math.max(1, scale));
  const ratio = nextScale / start.scale;
  return clampStudioView({
    scale: nextScale,
    x: currentAnchor.x - (startAnchor.x - start.x) * ratio,
    y: currentAnchor.y - (startAnchor.y - start.y) * ratio,
  }, size);
}
