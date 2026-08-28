const footerLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECT', href: '#projects' },
  { label: 'JOURNAL', href: '#journal' },
];

const socialLinks = [
  { label: 'Instagram', icon: '/assets/instagram.svg' },
  { label: 'LinkedIn', icon: '/assets/linkedin.svg' },
  { label: 'X', icon: '/assets/x.svg' },
  { label: 'YouTube', icon: '/assets/youtube.svg' },
];

export default function Footer({ content }) {
  return (
    <footer className="w-full bg-black px-2 pb-10 font-inter">
      <div data-footer-shell className="grid min-h-[360px] w-full grid-cols-[1.5fr_0.7fr_0.8fr] items-start gap-[70px] rounded-[120px] bg-[#171717] px-[70px] py-[65px] text-white max-lg:grid-cols-1 max-lg:gap-10 max-lg:rounded-[70px] max-lg:px-10 max-lg:py-[55px] max-md:rounded-[45px] max-md:px-7 max-md:py-10">
        <div className="max-w-[560px]">
          <span className="mb-[18px] block font-inter text-[22px] text-white">STAY CONNECTED.</span>
          <h2 className="mb-[22px] font-inter text-[58px] font-extrabold leading-[0.95] tracking-[-0.05em] text-white max-md:text-[48px]">
            {content.brand}
          </h2>
          <p className="mb-[34px] font-inter text-base leading-[1.2] text-white/35 max-md:text-sm">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-x-[18px] gap-y-2 font-inter text-base text-white">
            <span className="font-inter">
              Coded by <strong className="font-inter font-bold">{content.codedBy}</strong>
            </span>
            <span className="font-inter">
              Designed by <strong className="font-inter font-bold">{content.designedBy}</strong>
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-[18px] pt-5 max-lg:pt-0">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-inter text-xl font-semibold tracking-[-0.02em] text-white no-underline transition hover:translate-x-1 hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="pt-5 max-lg:pt-0">
          <h3 className="mb-[18px] font-inter text-[26px] font-semibold text-white/35">SOCIAL MEDIA</h3>
          <div className="flex items-center gap-[18px]">
            {socialLinks.map((link) => (
              <a key={link.label} href="#" aria-label={link.label} className="group">
                <img
                  src={link.icon}
                  alt=""
                  className="h-7 w-7 opacity-55 transition duration-200 group-hover:-translate-y-1 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

