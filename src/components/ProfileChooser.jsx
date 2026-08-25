import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const profileOptions = [
  {
    id: "erfan",
    number: "01",
    name: "Erfan Akrami",
    role: "Front-End Developer",
    image: "/assets/avatar.png",
    imagePosition: "center top",
  },
  {
    id: "matin",
    number: "02",
    name: "Matin Asghari",
    role: "UI/UX & Product Designer",
    image: "/assets/hero.png",
    imagePosition: "center 30%",
  },
];

export default function ProfileChooser({ onProfileChange, onComplete }) {
  const chooserRef = useRef(null);
  const headerRef = useRef(null);
  const promptRef = useRef(null);
  const footerRef = useRef(null);
  const cardsRef = useRef([]);
  const selectionRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useLayoutEffect(() => {
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (reducedMotionRef.current) {
        gsap.set(
          [headerRef.current, promptRef.current, footerRef.current, ...cardsRef.current],
          { clearProps: "all", autoAlpha: 1 },
        );
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          headerRef.current,
          { y: -24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65 },
        )
        .fromTo(
          promptRef.current,
          { y: 44, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
          },
          0.12,
        )
        .fromTo(
          cardsRef.current,
          { y: 80, autoAlpha: 0, clipPath: "inset(100% 0 0 0)" },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0% 0 0 0)",
            duration: 0.95,
            stagger: 0.12,
          },
          0.28,
        )
        .fromTo(
          footerRef.current,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55 },
          0.72,
        );
    }, chooserRef);

    return () => {
      context.revert();
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleSelect = (profileId) => {
    if (selectionRef.current) return;
    selectionRef.current = profileId;
    onProfileChange(profileId);

    const selectedCard = cardsRef.current.find(
      (card) => card?.dataset.profileId === profileId,
    );
    const otherCards = cardsRef.current.filter((card) => card !== selectedCard);

    if (reducedMotionRef.current) {
      gsap.to(chooserRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        onComplete,
      });
      return;
    }

    gsap
      .timeline({ onComplete })
      .to(
        [headerRef.current, promptRef.current, footerRef.current],
        {
          y: -20,
          autoAlpha: 0,
          duration: 0.38,
          stagger: 0.035,
          ease: "power3.in",
        },
        0,
      )
      .to(
        otherCards,
        {
          y: 36,
          scale: 0.97,
          autoAlpha: 0,
          duration: 0.42,
          stagger: 0.05,
          ease: "power3.in",
        },
        0,
      )
      .to(
        selectedCard,
        {
          scale: 1.018,
          duration: 0.48,
          ease: "power3.out",
        },
        0,
      )
      .to(
        chooserRef.current,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "expo.inOut",
        },
        0.34,
      );
  };

  return (
    <section
      ref={chooserRef}
      aria-labelledby="profile-chooser-title"
      className="fixed inset-0 z-[99995] overflow-hidden bg-[#f3f1eb] px-4 py-5 text-[#111] md:px-8 md:py-7"
    >
      <div className="mx-auto flex h-full max-w-[1500px] flex-col">
        <header
          ref={headerRef}
          className="flex items-center justify-between border-b border-black/20 pb-4 font-inter text-[9px] font-semibold uppercase tracking-[0.22em] text-black/60 md:text-[10px]"
        >
          <span>Two perspectives · One portfolio</span>
          <span>Choose a profile</span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center py-5 md:py-7">
          <div
            ref={promptRef}
            className="mb-5 flex items-end justify-between gap-6 md:mb-7"
          >
            <h1
              id="profile-chooser-title"
              className="max-w-[900px] font-inter text-[clamp(2.25rem,5vw,5.4rem)] font-light leading-[0.9] tracking-[-0.065em]"
            >
              Whose work would you like to explore first?
            </h1>
            <span className="hidden max-w-[220px] pb-1 text-right font-inter text-xs leading-[1.45] text-black/55 lg:block">
              You can switch profiles anytime using the portrait in the navigation.
            </span>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {profileOptions.map((option, index) => (
              <button
                key={option.id}
                ref={(node) => {
                  cardsRef.current[index] = node;
                }}
                type="button"
                data-profile-id={option.id}
                onClick={() => handleSelect(option.id)}
                aria-label={"View " + option.name + "'s portfolio first"}
                className="group relative min-h-[230px] cursor-pointer overflow-hidden rounded-[28px] border-0 bg-[#181818] text-left text-white outline-none transition-[filter] duration-200 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-[#f3f1eb] md:min-h-[360px] md:rounded-[38px]"
              >
                <img
                  src={option.image}
                  alt=""
                  aria-hidden="true"
                  style={{ objectPosition: option.imagePosition }}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.035] group-hover:grayscale-0 group-focus-visible:scale-[1.035] group-focus-visible:grayscale-0"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/25" />

                <span className="absolute left-5 right-5 top-5 flex items-start justify-between font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75 md:left-7 md:right-7 md:top-7">
                  <span>{option.number}</span>
                  <span>{option.role}</span>
                </span>

                <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-5 md:bottom-7 md:left-7 md:right-7">
                  <span>
                    <span className="mb-1 block font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      View resume
                    </span>
                    <span className="block font-inter text-[clamp(2rem,4vw,4.5rem)] font-light leading-[0.9] tracking-[-0.06em]">
                      {option.name}
                    </span>
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45 group-focus-visible:rotate-45 md:size-13">
                    <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <footer
          ref={footerRef}
          className="flex items-center justify-between border-t border-black/20 pt-4 font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-black/55"
        >
          <span>Erfan Akrami × Matin Asghari</span>
          <span>Select to continue</span>
        </footer>
      </div>
    </section>
  );
}