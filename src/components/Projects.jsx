function ProjectCard({ project }) {
  return (
    <a
      href={project.href ?? project.image}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} project`}
      data-project-card
      className="project-grid-card group relative block aspect-[694/800] overflow-hidden rounded-[clamp(42px,6.95vw,100px)] bg-[#c6c6c6]"
    >
      <img
        src={project.image}
        alt={project.alt}
        className="project-grid-image absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] group-focus-visible:scale-[1.045]"
      />

      <span className="project-card-panel absolute left-1/2 top-1/2 flex h-[45.5%] w-[51.5%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[clamp(30px,4.45vw,64px)] border border-white/10 bg-black/35 text-center text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-[22px] transition-[background-color,transform,box-shadow] duration-500 ease-out group-hover:scale-[1.035] group-hover:bg-black/45 group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.2)] group-focus-visible:scale-[1.035] group-focus-visible:bg-black/45">
        <span className="font-inter text-[clamp(7px,0.7vw,10px)] uppercase tracking-[-0.04em]">
          {project.category}
        </span>
        <strong className="mt-3 font-inter text-[clamp(17px,2.1vw,30px)] font-normal uppercase tracking-[-0.035em]">
          {project.title}
        </strong>
      </span>
    </a>
  );
}

export default function Projects({ projects }) {
  return (
    <section
      id="projects"
      data-projects-showcase
      aria-label="Selected projects"
      className="projects-showcase w-full bg-white px-4 pb-4 pt-1.5 text-black max-sm:px-2 max-sm:pb-2"
    >
      <div
        data-projects-grid
        className="grid grid-cols-1 gap-5 md:grid-cols-2 max-sm:gap-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
