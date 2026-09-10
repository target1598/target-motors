export type SiennaMotion = "rise" | "image" | "card";

/** Animate a separate content layer; the observed layout never moves or disappears. */
export function observeSiennaMotion(element: HTMLElement, content: HTMLElement, motion: SiennaMotion, delay = 0) {
  if (!("IntersectionObserver" in window) || typeof content.animate !== "function") return () => {};
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let entryObserver: IntersectionObserver | undefined;
  let boundaryObserver: IntersectionObserver | undefined;
  let animation: Animation | undefined;
  let armed = true;
  let generation = 0;

  const stop = () => { animation?.cancel(); animation = undefined; };
  const focused = () => element.contains(document.activeElement);
  const outside = () => {
    const rect = element.getBoundingClientRect();
    return rect.bottom < -96 || rect.top > window.innerHeight + 96;
  };
  const focusIn = () => { armed = false; stop(); };
  const focusOut = () => { if (outside()) armed = true; };
  const observe = () => {
    const cycle = ++generation;
    entryObserver?.disconnect();
    boundaryObserver?.disconnect();
    stop();
    if (preference.matches) return;
    armed = true;
    entryObserver = new IntersectionObserver((entries) => {
      if (cycle !== generation || preference.matches) return;
      const entry = entries[entries.length - 1];
      const rect = element.getBoundingClientRect();
      if (!entry?.isIntersecting || !armed || rect.bottom < 0 || rect.top > window.innerHeight) return;
      armed = false;
      if (focused()) return;
      const direction = rect.top < 0 ? -1 : 1;
      const transform = motion === "image" ? "scale(.96)" : `translateY(${direction * (motion === "card" ? 20 : 28)}px)`;
      stop();
      animation = content.animate([
        { opacity: motion === "image" ? .5 : .25, transform },
        { opacity: 1, transform: "none" },
      ], { duration: motion === "image" ? 1600 : 1200, delay: Math.min(180, Math.max(0, delay)), easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
    }, { threshold: 0 });
    // Re-entry replays only after the whole section has left this generous boundary.
    boundaryObserver = new IntersectionObserver((entries) => {
      if (cycle !== generation || preference.matches) return;
      const entry = entries[entries.length - 1];
      if (entry && !entry.isIntersecting && outside() && !focused()) { armed = true; stop(); }
    }, { threshold: 0, rootMargin: "96px 0px 96px 0px" });
    entryObserver.observe(element);
    boundaryObserver.observe(element);
  };
  observe();
  preference.addEventListener("change", observe);
  element.addEventListener("focusin", focusIn);
  element.addEventListener("focusout", focusOut);
  return () => {
    ++generation;
    entryObserver?.disconnect();
    boundaryObserver?.disconnect();
    stop();
    preference.removeEventListener("change", observe);
    element.removeEventListener("focusin", focusIn);
    element.removeEventListener("focusout", focusOut);
  };
}
