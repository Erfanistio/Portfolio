export default function About({ content }) {
  return (
    <section
      id="about"
      className="relative z-0 flex min-h-[780px] w-full items-center overflow-visible bg-[linear-gradient(to_bottom,#fff_0%,#fff_48%,#000_100%)]"
    >
      <img
        src="/assets/about.png"
        data-about-backdrop
        alt={content.imageAlt}
        className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[635px] w-[95%] -translate-x-1/2 rounded-[55px] object-[center_35%]"
      />

      <div className="relative z-[2] flex h-full w-full flex-row items-center justify-between gap-10 px-[8%] max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:px-10 max-lg:py-[60px]">
        <div data-about-title className="flex h-[180px] w-[480px] shrink-0 -translate-y-20 flex-row items-baseline justify-start gap-4 rounded-[40px] border border-white/10 bg-white/[0.06] px-10 shadow-[0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-[25px] max-lg:h-[140px] max-lg:w-full max-lg:max-w-[340px] max-lg:px-[30px] max-lg:py-5">
          <span className="inline-block -translate-y-5 whitespace-nowrap font-inter text-sm font-normal tracking-[0.05em] text-white/70 max-lg:leading-[100px]">
            {content.label}
          </span>
          <h2 className="ml-12 text-[100px] leading-[180px] tracking-[-0.02em] text-white max-lg:ml-2 max-lg:text-[64px] max-lg:leading-[100px]">
            ABOUT
          </h2>
        </div>

        <div data-about-copy className="flex max-w-[580px] -translate-y-20 flex-col gap-3.5">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-inter text-base font-light leading-[1.45] text-white/90 drop-shadow-md">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}


