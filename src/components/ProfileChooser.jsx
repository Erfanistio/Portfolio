import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const profileOptions = [
  {
    id: "matin",
    name: "MATIN",
    fullName: "Matin Asghari",
    role: "UI/UX DESIGNER",
    image: "/assets/hero.png",
    imagePosition: "67% center",
    description:
      "I’m a creative and detail-oriented UI/UX Designer passionate about creating modern, intuitive, and visually engaging digital experiences. My work combines user-centered thinking, strong visual design, responsive layouts, and scalable design systems to turn ideas into clear, functional products.",
    skills: ["WIREFRAME", "UI/UX", "DESIGN SYSTEM", "RESPONSIVE DESIGN", "USER INTERFACE"],
  },
  {
    id: "erfan",
    name: "ERFAN",
    fullName: "Erfan Akrami",
    role: "FRONT-END DEVELOPER",
    image: "/assets/avatar.png",
    imagePosition: "center",
    description:
      "I’m a front-end developer focused on building responsive, accessible, and polished web experiences. I turn thoughtful designs into fast, maintainable React interfaces, with close attention to interaction, usability, performance, and the visual details that make a product feel complete.",
    skills: ["REACT", "JAVASCRIPT", "TAILWIND CSS", "RESPONSIVE UI", "ACCESSIBILITY"],
  },
];

export default function ProfileChooser({ onProfileChange, onComplete }) {
  const [activeProfile, setActiveProfile] = useState(null);
  const chooserRef = useRef(null);
  const panelRef = useRef(null);
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
        gsap.set([panelRef.current, ...cardsRef.current], {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          panelRef.current,
          { scale: 0.975, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.85 },
        )
        .fromTo(
          cardsRef.current,
          { y: 38, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.11,
            clearProps: "transform,opacity,visibility",
          },
          0.16,
        );
    }, chooserRef);

    return () => {
      context.revert();
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handlePointerMove = (event) => {
    if (reducedMotionRef.current || !panelRef.current) return;

    const bounds = panelRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    panelRef.current.style.setProperty("--gradient-x", `${x}%`);
    panelRef.current.style.setProperty("--gradient-y", `${y}%`);
  };

  const handlePointerLeave = () => {
    panelRef.current?.style.setProperty("--gradient-x", "50%");
    panelRef.current?.style.setProperty("--gradient-y", "50%");
  };

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
      .to(otherCards, {
        y: 20,
        scale: 0.97,
        autoAlpha: 0,
        duration: 0.34,
        ease: "power3.in",
      })
      .to(
        selectedCard,
        { scale: 1.025, duration: 0.34, ease: "power3.out" },
        0,
      )
      .to(
        chooserRef.current,
        { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
        0.28,
      );
  };

  return (
    <section
      ref={chooserRef}
      aria-label="Choose whose portfolio to explore"
      className="profile-chooser fixed inset-0 z-[99995] overflow-hidden text-white"
    >
      <div
        ref={panelRef}
        className="profile-chooser-panel flex h-full w-full items-center justify-center overflow-hidden px-4 py-6 sm:px-8 lg:px-[5vw]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          data-active-profile={activeProfile || undefined}
          className="profile-card-grid grid w-[94%] max-w-[1180px] grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-[clamp(18px,2.4vw,44px)]"
        >
          {profileOptions.map((option, index) => (
            <button
              key={option.id}
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
              type="button"
              data-profile-id={option.id}
              data-active={activeProfile === option.id}
              onPointerEnter={() => setActiveProfile(option.id)}
              onPointerLeave={() => setActiveProfile(null)}
              onFocus={() => setActiveProfile(option.id)}
              onBlur={() => setActiveProfile(null)}
              onClick={() => handleSelect(option.id)}
              aria-label={`Explore ${option.fullName}'s portfolio`}
              className="profile-choice-card group relative z-0 w-full cursor-pointer overflow-hidden rounded-[24px] border border-white/30 bg-[#272727]/90 text-left text-white outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#333] sm:rounded-[34px]"
            >
              <span className="profile-choice-summary block h-full w-full">
                <img
                  src={option.image}
                  alt=""
                  aria-hidden="true"
                  style={{ objectPosition: option.imagePosition }}
                  className="profile-choice-image absolute rounded-[18px] object-cover shadow-[0_12px_20px_rgba(0,0,0,0.28)] sm:rounded-[25px]"
                />
                <span className="profile-choice-identity absolute min-w-0 text-center">
                  <span className="profile-choice-name block font-vt323 text-[clamp(2.75rem,6vw,7rem)] leading-[0.72] tracking-[0.025em]">
                    {option.name}
                  </span>
                  <span className="profile-choice-role mt-3 block font-vt323 text-[clamp(1rem,1.7vw,2rem)] leading-none tracking-[0.02em] sm:mt-5">
                    {option.role}
                  </span>
                </span>
              </span>
              <span className="profile-choice-details">
                <span className="profile-choice-details-inner">
                  <span className="profile-choice-hover-description">
                    {option.description}
                  </span>
                  <span className="profile-choice-hover-skills">
                    {option.skills.map((skill) => (
                      <span key={skill} className="profile-choice-hover-skill">
                        {skill}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
