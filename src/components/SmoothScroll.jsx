import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const anchors = [...document.querySelectorAll('a[href^="#"]')];

    const cleanups = anchors.map((anchor) => {
      const handleClick = (event) => {
        const href = anchor.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();

        lenis.scrollTo(target, {
          offset: -20,
          duration: 1.35,
        });
      };

      anchor.addEventListener("click", handleClick);

      return () => anchor.removeEventListener("click", handleClick);
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}