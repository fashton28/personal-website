"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

const SCALE_MIN = 0.7;
const OPACITY_MIN = 0.35;
const SETS = 3;
const COUNT = projects.length;
const loopedProjects = Array.from({ length: SETS }, () => projects).flat();

export default function ProjectsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scaleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isJumping = useRef(false);
  const [mounted, setMounted] = useState(false);

  const updateScales = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const cardWidth = window.innerWidth >= 640 ? 380 : 320;
    const falloff = cardWidth + 20;

    for (const el of scaleRefs.current) {
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - elCenterX);
      const ratio = Math.min(distance / falloff, 1);

      const scale = SCALE_MIN + (1 - SCALE_MIN) * (1 - ratio);
      const opacity = OPACITY_MIN + (1 - OPACITY_MIN) * (1 - ratio);

      el.style.transform = `scale(${scale})`;
      el.style.opacity = String(opacity);
    }
  }, []);

  const resetLoop = useCallback(() => {
    const container = scrollRef.current;
    if (!container || isJumping.current) return;

    const cardWidth = window.innerWidth >= 640 ? 380 : 320;
    const gap = 20;
    const oneSetWidth = COUNT * (cardWidth + gap);

    const scrollLeft = container.scrollLeft;
    const middleStart = oneSetWidth;
    const middleEnd = oneSetWidth * 2;

    if (scrollLeft < middleStart - cardWidth / 2 || scrollLeft >= middleEnd - cardWidth / 2) {
      isJumping.current = true;
      container.style.scrollSnapType = "none";

      let target = scrollLeft % oneSetWidth;
      target += oneSetWidth;

      container.scrollLeft = target;
      updateScales();

      requestAnimationFrame(() => {
        container.style.scrollSnapType = "x mandatory";
        isJumping.current = false;
      });
    }
  }, [updateScales]);

  const onScroll = useCallback(() => {
    if (isJumping.current) return;
    updateScales();
  }, [updateScales]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Scroll to the middle set on mount (no animation)
    const cardWidth = window.innerWidth >= 640 ? 380 : 320;
    const gap = 20;
    const oneSetWidth = COUNT * (cardWidth + gap);
    container.scrollLeft = oneSetWidth;

    // Trigger scale calc then reveal
    updateScales();
    requestAnimationFrame(() => setMounted(true));

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("scrollend", resetLoop);
    window.addEventListener("resize", updateScales);

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", resetLoop);
      window.removeEventListener("resize", updateScales);
    };
  }, [updateScales, onScroll, resetLoop]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 px-5 pt-6 pb-4 sm:px-9">
        <div className="mx-auto max-w-[780px]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-[0.8rem]">Home</span>
          </Link>
          <div className="mt-3">
            <p className="section-label">Work</p>
            <h1 className="mt-1 text-xl font-semibold text-white">Projects</h1>
          </div>
        </div>
      </header>

      {/* Carousel */}
      <div
        className={`flex flex-1 items-center overflow-hidden transition-opacity duration-500 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={scrollRef}
          className="hide-scrollbar flex w-full gap-5 overflow-x-auto"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Left spacer to center first visible card */}
          <div className="shrink-0 w-[max(0px,calc((100vw-320px)/2))] sm:w-[max(0px,calc((100vw-380px)/2))]" />

          {loopedProjects.map((project, i) => (
            <div key={`${project.id}-${i}`} className="shrink-0 snap-center">
              <div
                ref={(el) => { scaleRefs.current[i] = el; }}
                className="origin-center transition-[transform,opacity] duration-300 ease-out"
              >
                <ProjectCard project={project} />
              </div>
            </div>
          ))}

          {/* Right spacer to center last visible card */}
          <div className="shrink-0 w-[max(0px,calc((100vw-320px)/2))] sm:w-[max(0px,calc((100vw-380px)/2))]" />
        </div>
      </div>
    </div>
  );
}
