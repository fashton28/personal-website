export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative space-y-6">
      <p className="section-label">Work</p>

      <button
        type="button"
        className="relative flex h-[95px] w-full items-center justify-center overflow-hidden rounded-[28px] border border-border/70 bg-[#080a0f] shadow-[0_20px_70px_rgba(0,0,0,0.45)] transition-all duration-200 hover:border-white/20 hover:bg-white/[0.1] hover:-translate-y-0.5 active:translate-y-0"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(#293041_1px,transparent_1px)] [background-size:10px_10px]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080a0f]" />
          Cool stuff I&apos;ve built
      </button>
    </section>
  );
}

export const projectsSectionMeta = {
  id: "projects",
  title: "Projects"
};
