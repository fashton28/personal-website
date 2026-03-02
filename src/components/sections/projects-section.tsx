import Link from "next/link";

export function ProjectsSection() {

  return (

    <section id="projects" aria-labelledby="projects-title" className="relative space-y-3">

      <p className="section-label">Work</p>

      <Link
        href="/projects"
        className="relative flex h-[72px] w-full items-center justify-center overflow-hidden rounded-[22px] bg-[#080a0f] text-[0.85rem] shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] transition-all duration-200 hover:bg-black hover:-translate-y-0.5 active:translate-y-0 group"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(#293041_1px,transparent_1px)] [background-size:10px_10px] group-hover:opacity-0"
        />
        Cool stuff I&apos;ve built
      </Link>
    </section>

  );

}

export const projectsSectionMeta = {

  id: "projects",

  title: "Projects",

};
