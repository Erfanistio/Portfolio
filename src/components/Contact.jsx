export default function Contact({ content }) {
  return (
    <section
      id="contact"
      className="relative w-full bg-black px-2 pb-16 max-md:pb-10"
    >
      <div className="relative h-[740px] w-full overflow-hidden rounded-[100px] max-lg:h-auto max-lg:min-h-[760px] max-md:rounded-[52px]">
        <img
          src="/assets/contact.png"
          data-contact-image
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />

        <div className="relative z-[2] flex h-full w-full items-center justify-between gap-[60px] px-[110px] py-[95px] max-lg:flex-col max-lg:items-start max-lg:px-10 max-lg:py-[70px]">
          <div data-contact-copy className="max-w-[470px]">
            <h2 className="mb-[34px] text-[110px] leading-[0.92] text-white max-md:text-[72px]">
              GET IN
              <br />
              TOUCH
            </h2>
            <p className="max-w-[430px] text-[28px] uppercase leading-[1.12] text-white max-md:text-xl">
              {content.intro}
            </p>
          </div>

          <div data-contact-form className="w-[510px] rounded-[42px] border border-white/20 bg-white/[0.08] px-[42px] py-[42px] pb-9 shadow-glass backdrop-blur-[22px] max-lg:w-full max-lg:max-w-[520px] max-md:rounded-[28px] max-md:px-[22px] max-md:py-7">
            <h3 className="mb-[55px] text-center text-2xl text-white">CONTACT ME</h3>

            <form className="flex flex-col gap-[18px]" onSubmit={(event) => event.preventDefault()}>
              <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
                <label className="flex flex-col font-inter text-[15px] text-white">
                  <span className="mb-2.5 font-inter">First name</span>
                  <input className="contact-input" type="text" placeholder="Jane" autoComplete="given-name" />
                </label>
                <label className="flex flex-col font-inter text-[15px] text-white">
                  <span className="mb-2.5 font-inter">Last name</span>
                  <input className="contact-input" type="text" placeholder="Smith" autoComplete="family-name" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-[18px] max-md:grid-cols-1">
                <label className="flex flex-col font-inter text-[15px] text-white">
                  <span className="mb-2.5 font-inter">Email</span>
                  <input className="contact-input" type="email" placeholder="jane@gmail.com" autoComplete="email" />
                </label>
                <label className="flex flex-col font-inter text-[15px] text-white">
                  <span className="mb-2.5 font-inter">Phone no.</span>
                  <input className="contact-input" type="tel" placeholder="(347)-000-0000" autoComplete="tel" />
                </label>
              </div>

              <button className="mt-1 h-[58px] rounded-full border-0 bg-white text-[22px] text-black transition hover:scale-[1.02]">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


