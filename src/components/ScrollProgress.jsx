export default function ScrollProgress() {
  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-[99980] hidden -translate-y-1/2 flex-col items-center gap-3 text-black mix-blend-difference md:flex"
    >
      <span className="rotate-180 font-inter text-[9px] font-semibold tracking-[0.28em] text-white [writing-mode:vertical-rl]">
        SCROLL
      </span>
      <div className="relative h-24 w-px overflow-hidden bg-white/25">
        <span
          data-scroll-progress
          className="absolute inset-0 origin-top scale-y-0 bg-white"
        />
      </div>
      <span
        data-scroll-counter
        className="w-5 font-inter text-[9px] font-semibold tabular-nums text-white"
      >
        00
      </span>
    </aside>
  );
}
