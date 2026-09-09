import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { clampStudioView, INITIAL_STUDIO_VIEW, pinchStudioView } from "./studio-zoom.ts";

const size = { width: 400, height: 300 };

describe("studio pinch and pan", () => {
  it("keeps an off-center car detail under the fingers while zooming", () => {
    const anchor = { x: 60, y: -30 };
    const view = pinchStudioView(INITIAL_STUDIO_VIEW, 2, anchor, anchor, size);
    assert.equal(anchor.x * view.scale + view.x, anchor.x);
    assert.equal(anchor.y * view.scale + view.y, anchor.y);
  });

  it("follows a moving pinch midpoint without jumping from an existing pan", () => {
    const start = { scale: 1.5, x: 25, y: -10 };
    const from = { x: 40, y: 20 };
    const to = { x: 65, y: 30 };
    const view = pinchStudioView(start, 2, from, to, size);
    assert.equal(((from.x - start.x) / start.scale) * view.scale + view.x, to.x);
    assert.equal(((from.y - start.y) / start.scale) * view.scale + view.y, to.y);
  });

  it("prevents empty edges when panning to a corner or resizing the frame", () => {
    const corner = clampStudioView({ scale: 2, x: 1000, y: -1000 }, size);
    assert.deepEqual(corner, { scale: 2, x: 200, y: -150 });
    assert.deepEqual(clampStudioView(corner, { width: 200, height: 150 }), { scale: 2, x: 100, y: -75 });
  });

  it("returns to the full scene when fingers pinch closed and caps extreme enlargement", () => {
    const center = { x: 0, y: 0 };
    assert.deepEqual(pinchStudioView({ scale: 2, x: 80, y: 60 }, .2, center, center, size), INITIAL_STUDIO_VIEW);
    assert.equal(pinchStudioView(INITIAL_STUDIO_VIEW, 20, center, center, size).scale, 2.5);
  });
});
