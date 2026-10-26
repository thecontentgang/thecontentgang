import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis: Lenis | null = null;
let scrollLocks = 0;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Header height offset so anchored sections don't hide under the fixed navbar. */
const NAV_OFFSET = 0;

/**
 * Starts Lenis and drives it from GSAP's ticker so ScrollTrigger and Lenis
 * share a single rAF loop. Returns a cleanup function.
 */
export function initSmoothScroll(): () => void {
  if (reducedMotion()) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    // Keep native momentum on touch devices; it is already smooth there
    // and avoids fighting the browser's overscroll/URL-bar behaviour.
    syncTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Smooth-scroll in-page anchor clicks (nav, footer, etc.)
  const onAnchorClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const anchor = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
    if (!anchor) return;
    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
    history.replaceState(null, "", hash);
  };
  document.addEventListener("click", onAnchorClick);

  return () => {
    document.removeEventListener("click", onAnchorClick);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Smoothly scroll to a section id (falls back to native when Lenis is off). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
}

/** Reference-counted scroll lock for modals / menus. Returns an unlock function. */
export function lockScroll(): () => void {
  scrollLocks += 1;
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    scrollLocks = Math.max(0, scrollLocks - 1);
    if (scrollLocks === 0) {
      document.documentElement.style.overflow = "";
      lenis?.start();
    }
  };
}
