import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { existsSync } from "node:fs";
import { TOYOTA_INTERIORS } from "./toyota-interiors.generated.ts";
import { toyotaInterior, toyotaInteriorsForTrim } from "./toyota-interiors.ts";

describe("Toyota trim-specific interiors", () => {
  it("keeps Camry sports leather exclusive to XSE and quilting leather exclusive to XLE", () => {
    assert.deepEqual(toyotaInteriorsForTrim("camry", "xse").map((i) => i.code), ["20LB", "30LB"]);
    assert.deepEqual(toyotaInteriorsForTrim("camry", "xle").map((i) => i.code).sort(), ["10LA", "20LA"]);
    assert.deepEqual(toyotaInteriorsForTrim("camry", "se").map((i) => i.code), ["20EA"]);
    assert.equal(toyotaInterior("camry", "se", "30lb"), undefined);
    assert.equal(toyotaInterior("camry", "xle", "30lb"), undefined);
    assert.equal(toyotaInterior("camry", "xse", "20la"), undefined);
  });

  it("does not share images between packages even when their upholstery code is the same", () => {
    const seven = toyotaInterior("grand-highlander", "hybrid-limited-7", "20lc")!;
    const eight = toyotaInterior("grand-highlander", "hybrid-limited-8", "20lc")!;
    assert.ok(seven && eight);
    assert.notEqual(seven.views[0].src, eight.views[0].src);
    assert.ok(seven.views.every((v) => v.src.includes("/hybrid-limited-7/")));
    assert.ok(eight.views.every((v) => v.src.includes("/hybrid-limited-8/")));
  });

  it("never falls back to another trim for absent photos or unknown selections", () => {
    for (const trim of ["le-awd-mobility", "le-fwd-mobility", "xle-mobility", "xse-mobility"]) {
      assert.deepEqual(toyotaInteriorsForTrim("sienna", trim), []);
    }
    assert.deepEqual(toyotaInteriorsForTrim("camry", "unknown"), []);
    assert.deepEqual(toyotaInteriorsForTrim("accord", "se"), []);
    assert.equal(toyotaInterior("crown", "limited", "30lb"), undefined);
  });

  it("provides every supplied view as a real file under its exact vehicle, trim and color", () => {
    let images = 0;
    let options = 0;
    assert.equal(Object.keys(TOYOTA_INTERIORS).length, 9);
    for (const [slug, trims] of Object.entries(TOYOTA_INTERIORS)) {
      for (const [trim, interiors] of Object.entries(trims)) {
        assert.equal(new Set(interiors.map((i) => i.id)).size, interiors.length);
        for (const interior of interiors) {
          options++;
          assert.ok(interior.views.length >= 2);
          assert.equal(new Set(interior.views.map((v) => v.id)).size, interior.views.length);
          for (const view of interior.views) {
            images++;
            assert.ok(view.src.startsWith(`interiors/toyota/${slug}/${trim}/${interior.id}/`));
            assert.ok(existsSync(new URL(`../../public/${view.src}`, import.meta.url)), view.src);
          }
        }
      }
    }
    assert.equal(options, 54);
    assert.equal(images, 193);
  });
});
