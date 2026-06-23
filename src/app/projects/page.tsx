"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";

import { projects } from "@/data/projects";

// Reuse the site's signature frosted-glass shadow.
const FROST =
  "shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33]";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Track which panel is centered in the viewport.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root, threshold: 0.55 },
    );

    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Deep-link support: /projects#<anchorId> (e.g. from the command palette) jumps to that panel.
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const index = projects.findIndex((p) => p.anchorId === hash);
      if (index >= 0) {
        panelRefs.current[index]?.scrollIntoView({ behavior: "auto", block: "start" });
        setActive(index);
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRefs.current[clamped]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  // Keyboard navigation (↑/↓).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goTo(active + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Back to home */}
      <Link
        href="/"
        className="fixed left-5 top-4 z-40 inline-flex items-center gap-1.5 rounded-full bg-[#131316]/70 px-3 py-1.5 text-[0.8rem] text-muted backdrop-blur-md transition-colors hover:text-text sm:left-9 sm:top-6"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Home
      </Link>

      {/* Dot rail */}
      <div className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-2.5 sm:right-5">
        {projects.map((project, i) => (
          <button
            key={project.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${project.title}`}
            aria-current={i === active}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "h-6 w-1.5 bg-accent" : "h-1.5 w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Reel */}
      <div
        ref={containerRef}
        className="hide-scrollbar h-dvh snap-y snap-mandatory overflow-y-auto"
      >
        {projects.map((project, i) => {
          const isActive = i === active;
          const accent = project.accent ?? "#38b6ff";
          return (
            <section
              key={project.id}
              id={project.anchorId}
              data-index={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="relative flex h-dvh snap-start items-center justify-center overflow-hidden"
            >
              {/* Ambient bloom — a GPU-cheap radial glow in the project's accent color.
                  (Replaces a full-screen blur(90px) image, which stalled mobile GPUs and
                  froze the menu-curtain animation mid-slide on navigation.) */}
              <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
                <div
                  className="absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700 ease-out"
                  style={{
                    background: `radial-gradient(circle, ${accent} 0%, transparent 68%)`,
                    opacity: isActive ? 0.3 : 0.12,
                  }}
                />
                {/* Vignette to keep text legible and edges deep */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--color-bg)_82%)]" />
              </div>

              {/* Content */}
              <div className="relative z-10 mx-auto grid w-full max-w-[1040px] items-center gap-9 px-6 sm:gap-12 lg:grid-cols-2 lg:px-10">
                {/* Project visual */}
                <div
                  className={`order-1 transition-all duration-700 ease-out ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-[24px] bg-[#080a0f] ${FROST}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1040px) 100vw, 520px"
                      className={project.imageClassName ?? "object-cover"}
                    />
                  </div>
                </div>

                {/* Copy */}
                <div
                  className={`order-2 flex flex-col items-start gap-4 transition-all delay-100 duration-700 ease-out ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                >
                  {project.badge && (
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-soft backdrop-blur-sm">
                      {project.badge}
                    </span>
                  )}

                  <h2 className="text-[2rem] font-bold leading-[1.05] tracking-tight text-text sm:text-[2.8rem]">
                    {project.title}
                  </h2>

                  <p className="max-w-[46ch] text-[0.98rem] leading-relaxed text-soft sm:text-[1.08rem]">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.06] px-3 py-1 text-[0.72rem] text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${accent} 82%, #ffffff), ${accent})`,
                        color: "#0a0b0e",
                        boxShadow: `0px 10px 30px -8px ${accent}`,
                      }}
                      className="group mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.9rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
                    >
                      View project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.25} />
                    </a>
                  )}
                </div>
              </div>

              {/* Scroll hint — first panel only */}
              {i === 0 && (
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next project"
                  className={`absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-opacity duration-500 hover:text-white/70 ${
                    active === 0 ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1.5} />
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
