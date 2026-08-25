import { Plus } from "lucide-react";
import { navLinks } from "../data/content.js";

export default function Navbar({
  isLoaded,
  avatarSrc,
  avatarAlt,
  isErfanProfile,
  onAvatarClick,
}) {
  const navClassName =
    "pointer-events-auto mb-[30px] flex h-[93px] w-[632px] items-center gap-[30px] rounded-[34px] bg-black/40 p-3 backdrop-blur-[20px] transition-all duration-700 ease-out " +
    (isLoaded ? "translate-y-0 opacity-100" : "translate-y-[30px] opacity-0");

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-[99990] flex h-[133px] w-screen items-center justify-center">
      <nav id="site-nav" className={navClassName}>
        <button
          type="button"
          onClick={onAvatarClick}
          aria-pressed={isErfanProfile}
          aria-label={
            isErfanProfile
              ? "Show Matin Asghari's UI/UX designer profile"
              : "Show Erfan Akrami's front-end developer profile"
          }
          title={isErfanProfile ? "Switch to Matin Asghari" : "Switch to Erfan Akrami"}
          className="h-[69px] w-[95px] shrink-0 cursor-pointer overflow-hidden rounded-[25px] border-0 bg-transparent p-0 transition hover:scale-[1.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img src={avatarSrc} alt={avatarAlt} className="h-full w-full object-cover" />
        </button>

        <div className="hidden gap-10 text-xl text-white md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="inline-block transition hover:scale-105">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="ml-auto flex h-[65px] w-[129px] items-center gap-5 rounded-[20px] bg-white px-6 py-3 text-black transition hover:scale-105"
        >
          CONTACT
          <Plus size={18} strokeWidth={1.8} />
        </a>
      </nav>
    </div>
  );
}
