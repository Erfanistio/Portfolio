import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, index }) {
  return (
    <a
      href={project.href ?? project.image}
      target="_blank"
      rel="noreferrer"
      aria-label={"Open " + project.title + " project"}
      data-project-card
      className="project-grid-card group grid min-h-[280px] overflow-hidden rounded-[26px] bg-[#f2f2f2] sm:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="relative min-h-[230px] overflow-hidden bg-[#dedede] sm:min-h-full">
        <img
          src={project.image}
          alt={project.alt}
          className="project-grid-image absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
        />
        <span className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/5" />
      </div>

      <div className="flex min-w-0 flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 font-inter text-[9px] font-semibold uppercase tracking-[0.2em] text-black/45">
          <span>{project.category}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="py-10 sm:py-6">
          <h3 className="break-words font-inter text-[clamp(2rem,3vw,3.3rem)] font-light leading-[0.9] tracking-[-0.055em]">
            {project.title}
          </h3>
        </div>

        <span className="inline-flex items-center gap-2 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-black/55 transition group-hover:text-black">
          View project
          <ArrowUpRight
            size={15}
            strokeWidth={1.6}
            className="transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </span>
      </div>
    </a>
  );
}

export default function Projects({ projects }) {
  return (
    <section
      id="projects"
      data-projects-showcase
      className="projects-showcase w-full bg-white px-[7vw] py-[8vw] text-black max-md:px-5 max-md:py-20"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-6 flex items-end justify-between border-b border-black/20 pb-5 font-inter text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">
          <span>Selected projects</span>
          <span>{String(projects.length).padStart(2, "0")} works</span>
        </div>

        <div data-projects-grid className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}