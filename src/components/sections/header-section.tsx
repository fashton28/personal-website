"use client";

import Image from "next/image";
import { Clock3 } from "lucide-react";

const EMAIL = "hi@jacobvos.com";

interface HeaderSectionProps {
  clockLabel: string;
  copied: boolean;
}

export function HeaderSection({ clockLabel, copied }: HeaderSectionProps) {
  return (
    <header id="header" className="relative space-y-7" aria-labelledby="header-title">
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-2 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-muted">
          <Clock3 className="h-3.5 w-3.5" />
          {clockLabel}
        </p>
      </div>

      <div className="flex items-start gap-4">

        <div className="pt-0.5">
          <h1 id="header-title" className="inline-flex items-center gap-2 text-[1.85rem] font-semibold tracking-tight text-text sm:text-[2.05rem]">
            Fabian Ashton
          </h1>
          <p className="mt-1 text-[1.05rem] text-muted">Engineer and entrepreneur</p>
        </div>
      </div>

      <div className="space-y-4 text-[0.98rem] leading-relaxed text-[#d5d9e3]">
        <ul className="space-y-1.5">
          <li className="flex gap-2">
            <span className="ml-1 text-xs">◆</span>
            <span>
              Engineering <span aria-hidden>🌐</span>{" "}
              <span className="underline underline-offset-2 decoration-white/70">ModulrLabs</span>
            </span>
          </li>
          <li className="flex gap-2">
            <span className="ml-1 text-xs">■</span>
            <span className="flex items-center gap-1">
              CS @
              <span className="flex items-center gap-1">
                <Image
                  src="/penn.png"
                  alt="UPenn"
                  width={25}
                  height={25}
                  style={{ display: "inline", verticalAlign: "-0.2em" }}
                  draggable={false}
                />
                <span className="underline underline-offset-2 decoration-white/70">University of Pennsylvania</span>
              </span>
            </span>
          </li>
        </ul>

        <div className="space-y-1.5">
          <p className="font-mono text-[0.86rem] italic text-[#b5bac7]">
            • what I&apos;ve been building:
          </p>
          <ul className="space-y-1.5">
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>
                created <span className="font-semibold" style={{ color: "#ff66c4" }}>Cursor for 3D modeling</span> (3M+ views, 1,900+ stars,
                inbound VC interest from Sequoia, a16z, GC, others)
              </span>
            </li>
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>shipped a product in &lt; 2 days to 10,000+ users</span>
            </li>
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>did it again with another product (1,000+ users in &lt; 24 hours)</span>
            </li>
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>built a deep learning framework from scratch in C++</span>
            </li>
          </ul>
        </div>

        <div className="space-y-1.5">
          <p className="font-mono text-[0.86rem] italic text-[#b5bac7]">• previously:</p>
          <ul className="space-y-1.5">
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>
                Engineering <span aria-hidden>🛍</span>{" "}
                <span className="underline underline-offset-2 decoration-white/70">Shopify</span>
              </span>
            </li>
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>
                Engineering <span aria-hidden>🧪</span>{" "}
                <span className="underline underline-offset-2 decoration-white/70">Browserbase</span>
              </span>
            </li>
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>
                ML research <span aria-hidden>🏥</span>{" "}
                <span className="underline underline-offset-2 decoration-white/70">Sunnybrook</span>
              </span>
            </li>
            <li className="flex gap-2 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-xs">↳</span>
              <span>
                Research <span aria-hidden>🎓</span>{" "}
                <span className="underline underline-offset-2 decoration-white/70">UWaterloo</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <p className="inline-flex items-center gap-2 text-[1.02rem] text-muted">
        Press
        <kbd className="rounded-md border border-border bg-panel2 px-2 py-0.5 font-mono text-xs text-[#d9dde5]">C</kbd>
        to copy my email
        <span className="text-accent">{copied ? "(copied)" : ""}</span>
      </p>
    </header>
  );
}

export const headerSectionMeta = {
  id: "header",
  title: "Header"
};

export const siteEmail = EMAIL;
