export default function Hero({ heroSrc, content }) {
  const nameWords = content.name.split(" ");

  return (
    <section
      id="hero"
      className="bg-white relative mt-5 h-[880px] w-[calc(100%_-_64px)] overflow-hidden rounded-[90px] max-lg:h-[720px] max-md:h-[620px] max-md:w-[calc(100%_-_24px)] max-md:rounded-[45px]"
    >
      <img
        src={heroSrc}
        data-hero-image
        alt={content.name + " hero portrait"}
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      <div data-hero-copy className="absolute left-[7%] top-[28%] z-10 w-[520px] max-md:left-8 max-md:top-[22%] max-md:w-[calc(100%_-_64px)]">
        <h1
          data-hero-title
          aria-label={content.name}
          className="flex flex-wrap gap-x-[0.2em] text-[90px] leading-[0.95] text-black max-md:text-[58px]"
        >
          {nameWords.map((word) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.08em]">
              <span
                data-hero-title-word
                aria-hidden="true"
                className="inline-block"
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-hero-role
          className="mt-3 text-[32px] text-black max-md:text-[24px]"
        >
          {content.role}
        </p>

        <p
          data-hero-intro
          className="mt-[30px] text-[28px] leading-[1.35] text-black max-md:text-[20px]"
        >
          {content.intro}
        </p>
      </div>
    </section>
  );
}