import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealOnScroll = (target, trigger, from, options = {}) => {
  gsap.from(target, {
    ...from,
    duration: options.duration ?? 1,
    stagger: options.stagger ?? 0,
    ease: options.ease ?? "power4.out",
    scrollTrigger: {
      trigger,
      start: options.start ?? "top 84%",
      toggleActions: "play none none reverse",
    },
  });
};

export default function ScrollAnimations({ refreshKey, isReady }) {
  useLayoutEffect(() => {
    if (!isReady) return undefined;

    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      const progressBar = document.querySelector("[data-scroll-progress]");
      const progressCounter = document.querySelector("[data-scroll-counter]");
      const nav = document.querySelector("#site-nav");

      if (progressBar && progressCounter) {
        const setProgress = gsap.quickSetter(progressBar, "scaleY");

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            setProgress(self.progress);
            progressCounter.textContent = String(
              Math.round(self.progress * 100),
            ).padStart(2, "0");
          },
        });
      }

      if (nav) {
        const moveNav = gsap.quickTo(nav, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
        const scaleNav = gsap.quickTo(nav, "scale", {
          duration: 0.45,
          ease: "power3.out",
        });

        ScrollTrigger.create({
          start: 20,
          end: "max",
          onUpdate: (self) => {
            const driftingDown =
              self.direction === 1 && Math.abs(self.getVelocity()) > 220;
            moveNav(driftingDown ? 15 : 0);
            scaleNav(driftingDown ? 0.965 : 1);
          },
        });
      }

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduce } = mediaContext.conditions;

          gsap.set("[data-hero-copy]", { visibility: "visible" });

          if (reduce) {
            gsap.set(
              [
                "[data-hero-copy] > *",
                "[data-hero-title-word]",
                "[data-project-card]",
                "[data-about-title]",
                "[data-about-copy] > p",
                "[data-service-card]",
                "[data-journal-shell]",
                "[data-journal-card]",
                "[data-contact-copy]",
                "[data-contact-form]",
                "[data-footer-shell]",
              ],
              { clearProps: "all", autoAlpha: 1 },
            );
            return undefined;
          }

          gsap.set(
            ["[data-hero-title-word]", "[data-hero-role]", "[data-hero-intro]"],
            { autoAlpha: 0 },
          );
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .fromTo(
              "[data-hero-title-word]",
              {
                yPercent: 115,
                rotation: desktop ? 3 : 1.5,
                autoAlpha: 0,
              },
              {
                yPercent: 0,
                rotation: 0,
                autoAlpha: 1,
                duration: desktop ? 1.05 : 0.78,
                stagger: desktop ? 0.12 : 0.08,
              },
            )
            .fromTo(
              "[data-hero-role]",
              {
                x: desktop ? -42 : -24,
                autoAlpha: 0,
                filter: desktop ? "blur(5px)" : "blur(0px)",
              },
              {
                x: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: desktop ? 0.82 : 0.62,
              },
              desktop ? 0.32 : 0.22,
            )
            .fromTo(
              "[data-hero-intro]",
              {
                y: desktop ? 42 : 26,
                autoAlpha: 0,
                clipPath: "inset(0 0 100% 0)",
              },
              {
                y: 0,
                autoAlpha: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: desktop ? 1 : 0.75,
              },
              desktop ? 0.5 : 0.36,
            );

          if (!desktop) {
            gsap.utils.toArray("[data-project-card]").forEach((card) => {
              revealOnScroll(
                card,
                card,
                { y: 70, autoAlpha: 0 },
                { duration: 0.85, start: "top 90%" },
              );
            });

            gsap.utils
              .toArray([
                "[data-about-title]",
                "[data-about-copy]",
                "[data-service-card]",
                "[data-journal-shell]",
                "[data-contact-copy]",
                "[data-contact-form]",
                "[data-footer-shell]",
              ])
              .forEach((element) => {
                revealOnScroll(
                  element,
                  element,
                  { y: 60, autoAlpha: 0 },
                  { duration: 0.85, start: "top 90%" },
                );
              });

            return undefined;
          }

          gsap.to("[data-hero-image]", {
            yPercent: 13,
            scale: 1.13,
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          gsap.to("[data-hero-copy]", {
            yPercent: -24,
            autoAlpha: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: "#hero",
              start: "18% top",
              end: "78% top",
              scrub: 1,
            },
          });

          gsap.to("#hero", {
            scale: 0.955,
            borderRadius: "42px",
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: "#hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          });

          revealOnScroll(
            "[data-project-card]",
            "[data-projects-grid]",
            { y: 54, autoAlpha: 0 },
            { duration: 0.8, stagger: 0.1, start: "top 86%", ease: "power3.out" },
          );
          revealOnScroll(
            "[data-about-title]",
            "#about",
            { x: -130, rotation: -5, autoAlpha: 0 },
            { duration: 1.15, start: "top 75%" },
          );

          revealOnScroll(
            "[data-about-copy] > p",
            "[data-about-copy]",
            { x: 85, autoAlpha: 0, filter: "blur(7px)" },
            { duration: 0.85, stagger: 0.1, start: "top 82%", ease: "power3.out" },
          );

          gsap.to("[data-about-backdrop]", {
            yPercent: 13,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });

          revealOnScroll(
            "[data-service-card]",
            "[data-services-grid]",
            { y: 150, rotation: 2.5, autoAlpha: 0 },
            { duration: 1.15, stagger: 0.16, start: "top 85%" },
          );

          gsap.fromTo(
            "[data-journal-shell]",
            {
              clipPath: "inset(8% 4% 8% 4% round 140px)",
              autoAlpha: 0.45,
            },
            {
              clipPath: "inset(0% 0% 0% 0% round 115px)",
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#journal",
                start: "top 90%",
                end: "top 35%",
                scrub: 1,
              },
            },
          );

          revealOnScroll(
            "[data-journal-card]",
            "[data-journal-grid]",
            { y: 100, rotation: 2, autoAlpha: 0 },
            { duration: 1, stagger: 0.13, start: "top 84%", ease: "power3.out" },
          );

          gsap.to("[data-contact-image]", {
            scale: 1.14,
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: "#contact",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          revealOnScroll(
            "[data-contact-copy]",
            "#contact",
            { x: -110, autoAlpha: 0 },
            { duration: 1.1, start: "top 75%" },
          );

          revealOnScroll(
            "[data-contact-form]",
            "#contact",
            { x: 120, rotation: 3, autoAlpha: 0 },
            { duration: 1.15, start: "top 72%" },
          );

          revealOnScroll(
            "[data-footer-shell]",
            "[data-footer-shell]",
            { y: 90, scale: 0.97, autoAlpha: 0 },
            { duration: 1.15, start: "top 90%" },
          );
        },
      );
    });

    ScrollTrigger.refresh();

    return () => {
      media.revert();
      context.revert();
    };
  }, [refreshKey, isReady]);

  return null;
}