import Image from "next/image";
import type { ProjectItem } from "@/types/site";

interface ProjectCardProps {
  project: ProjectItem;
  isCentered?: boolean;
}

export function ProjectCard({ project, isCentered }: ProjectCardProps) {
  return (
    <div
      className={`relative block w-[320px] h-[420px] sm:w-[380px] sm:h-[480px] shrink-0 snap-center rounded-[22px] overflow-hidden bg-[#080a0f] shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] transition-transform duration-200 hover:-translate-y-1 ${isCentered && project.href ? "cursor-pointer" : ""}`}
    >
      {/* Cover image — top 60% */}
      <div className="relative h-[60%] w-full">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={project.imageClassName ?? "object-cover"}
        />
        {/* Gradient fade at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080a0f] to-transparent" />
      </div>

      {/* Content — bottom 40% */}
      <div className="flex h-[40%] flex-col justify-between px-5 pb-5">
        <div className="space-y-2">
          <h3 className="text-[0.95rem] font-semibold text-white leading-tight">
            {project.title}
          </h3>
          <p className="text-[0.8rem] leading-relaxed text-white/50 line-clamp-3">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[0.68rem] text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
