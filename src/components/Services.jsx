import { useEffect, useState } from "react";

function ServiceShape() {
  return (
    <div
      className="service-shape relative mb-5 h-[210px] overflow-hidden"
      aria-hidden="true"
    >
      {[0, 1, 2].map((card) => (
        <div
          key={card}
          className="service-slider-card absolute left-1/2 top-1 h-[200px] w-[150px] rounded-[14px] bg-white shadow-[0_18px_38px_rgba(0,0,0,0.2)]"
          style={{ animationDelay: card * -2 + "s" }}
        />
      ))}
    </div>
  );
}

function SkillPillSlider({ skills }) {
  const [activeSkill, setActiveSkill] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || skills.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveSkill((current) => (current + 1) % skills.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [skills]);

  const skill = skills[activeSkill];

  return (
    <div
      className="mx-auto mb-6 flex h-9 w-fit min-w-[190px] max-w-full items-center justify-center overflow-hidden rounded-full bg-white px-5 text-black"
      aria-live="polite"
      aria-label={"Current skill: " + skill}
    >
      <div
        key={skill}
        className="service-skill-pill-content flex items-center justify-center gap-3 whitespace-nowrap text-[13px] max-md:text-[11px]"
      >
        <span className="tabular-nums">
          {String(activeSkill + 1).padStart(2, "0")}
        </span>
        <span className="uppercase">{skill}</span>
      </div>
    </div>
  );
}

export default function Services({ service, milestones, skills }) {
  return (
    <section className="w-full overflow-hidden bg-black px-10 pb-20 max-md:px-4">
      <div data-services-grid className="mx-auto grid w-[75%] grid-cols-2 gap-7 overflow-visible max-xl:w-[95%] max-md:grid-cols-1">
        <article data-service-card className="min-h-[570px] rounded-[90px] bg-[#151515] px-[60px] py-[90px] pb-[70px] text-center text-white max-md:rounded-[60px] max-md:px-8">
          <h2 className="mb-[30px] text-[34px] tracking-[2px]">SERVICES</h2>
          <ServiceShape />
          <SkillPillSlider skills={skills} />
          <p className="mx-auto max-w-[380px] font-inter text-sm uppercase leading-[1.35] text-[#9f9f9f]">
            {service.description}
          </p>
        </article>

        <article data-service-card className="flex min-h-[570px] flex-col items-center rounded-[90px] bg-[#151515] px-[60px] py-[90px] pb-[70px] text-center text-white max-md:rounded-[60px] max-md:px-8">
          <h2 className="mb-[30px] text-[34px] tracking-[2px]">FOCUS</h2>

          {milestones.map((milestone, index) => (
            <div key={milestone.label} className="contents">
              {index > 0 && <div className="my-[26px] mb-1.5 h-px w-[225px] bg-[#4a4a4a]" />}
              <div className="mt-[42px]">
                <strong className="block text-[64px] leading-none max-md:text-[52px]">
                  {milestone.value}
                  {milestone.suffix && <span className="text-[#6b6b6b]">{milestone.suffix}</span>}
                </strong>
                <span className="mt-[18px] block font-inter text-sm">{milestone.label}</span>
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}