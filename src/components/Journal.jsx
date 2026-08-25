function JournalCard({ item }) {
  return (
    <article data-journal-card className="group text-center">
      <div className="relative mb-4 h-80 w-full cursor-pointer overflow-hidden rounded-[70px] bg-[#f4f4f4]">
        <img
          src={item.image}
          alt={item.alt}
          className="h-full w-full rounded-[inherit] object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-1/2 top-1/2 flex aspect-square w-[45%] -translate-x-1/2 -translate-y-1/2 scale-[0.85] items-center justify-center rounded-full bg-[rgba(180,180,180,0.85)] opacity-0 backdrop-blur-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
          <span className="font-inter text-[42px] font-light leading-none text-white">+</span>
        </div>
      </div>
      <p className="mx-auto mb-2.5 max-w-[280px] font-inter text-xs font-bold italic leading-[1.25] text-white">
        {item.description}
      </p>
      <span className="text-base text-white">{item.title}</span>
    </article>
  );
}

export default function Journal({ content }) {
  return (
    <section id="journal" className="w-full overflow-hidden bg-black px-[30px] pb-[90px] max-md:px-4">
      <div data-journal-shell className="mx-auto min-h-[650px] w-[95%] max-w-[1750px] rounded-[115px] bg-[#171717] px-[75px] py-[70px] pb-[85px] text-white max-lg:rounded-[70px] max-lg:px-[35px] max-lg:py-[55px] max-lg:pb-[70px]">
        <div className="mb-[55px] flex items-start justify-between gap-10 max-lg:flex-col">
          <h2 className="text-[82px] leading-[0.9] text-white max-md:text-[64px]">Journal</h2>
          <p className="max-w-[420px] text-left font-inter text-xs font-light uppercase leading-[1.4] text-white/60">
            {content.intro}
          </p>
        </div>

        <div data-journal-grid className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-1 max-lg:gap-10">
          {content.items.map((item, index) => (
            <JournalCard key={item.title + "-" + index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

