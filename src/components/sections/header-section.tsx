"use client";

import Image from "next/image";
import { Clock3 } from "lucide-react";
import { CmdKButton } from "@/components/cmd-k-button";

const EMAIL = "fashton502@gmail.com";

interface HeaderSectionProps {
  clockLabel: string;
  copied: boolean;
}

export function HeaderSection({ clockLabel, copied }: HeaderSectionProps) {
  return (
    <header id="header" className="relative space-y-3" aria-labelledby="header-title">
      <style jsx>{`
        .rotate-on-hover-parent:hover .rotate-on-hover {
          transform: rotate(45deg);
        }
        .rotate-on-hover {
          transition: transform 0.2s;
          display: inline-block;
        }
        .bold-underline {
          font-weight: bold;
        }
      `}</style>
      <div className="flex items-center justify-between">
        <p className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
          <Clock3 className="h-3 w-3" />
          {clockLabel}
        </p>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1
            id="header-title"
            className="inline-flex items-center gap-2 text-[1.55rem] font-semibold tracking-tight text-text sm:text-[1.7rem]"
          >
            Fabian Ashton
          </h1>
          <p className="mt-0.5 text-[0.92rem] text-muted">Engineer and entrepreneur</p>
        </div>
        <CmdKButton />
      </div>

      <div className="space-y-2.5 text-[0.85rem] leading-relaxed text-[#d5d9e3]">
        <ul className="space-y-1">
          <li className="flex gap-2 rotate-on-hover-parent">
            <span className="ml-1 text-[0.65rem] rotate-on-hover">■</span>
            <span className="flex items-center gap-1">
              CS @
              <span className="flex items-center gap-1">
                <Image
                  src="/penn.png"
                  alt="UPenn"
                  width={20}
                  height={20}
                  style={{ display: "inline", verticalAlign: "-0.2em" }}
                  draggable={false}
                />
                <span className="underline underline-offset-2 decoration-white/70">University of Pennsylvania</span>
              </span>
            </span>
          </li>
        </ul>

        <div className="space-y-1">
          <p className="font-mono text-[0.78rem] italic text-[#b5bac7]">
            • what I&apos;ve been building:
          </p>
          <ul className="space-y-0.5">
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>
                created the <span className="font-semibold" style={{ color: "#ff66c4", fontWeight: "bold" }}><b>Cursor for interview prep</b></span> (Built for the <i>AI Presidential Challenge</i>)
              </span>
            </li>
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>
                shipped a product in &lt; 8 hours in front of{" "}
                <span className="font-semibold" style={{ color: "#ff66c4", fontWeight: "bold" }}><b>Miami VCs</b></span>
              </span>
            </li>
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>did it again with another product (got engineering offers & VC inbound interest)</span>
            </li>
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>building chess engine in python from scratch</span>
            </li>
          </ul>
        </div>

        <div className="space-y-1">
          <p className="font-mono text-[0.78rem] italic text-[#b5bac7]">• previously:</p>
          <ul className="space-y-0.5">
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>
                Founded <span aria-hidden>🛍</span>{" "}
                <span className="underline underline-offset-2 decoration-white/70 bold-underline">marketing company </span>
                at 15
              </span>
            </li>
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>
                Check out <span aria-hidden>🧪</span>{" "}
                <a
                  href="https://github.com/fashton28/silo"
                  className="underline underline-offset-2 decoration-white/70 bold-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Silo
                </a>
              </span>
            </li>
            <li className="flex gap-2 pl-3 transition-transform duration-200 hover:translate-x-1">
              <span className="ml-1 text-[0.65rem]">↳</span>
              <span>
                Research <span aria-hidden>🎓</span>{" "}
                <span className="underline underline-offset-2 decoration-white/70 bold-underline">NASA ORBIT</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <p className="inline-flex items-center gap-2 text-[0.88rem] text-muted">
        Press
        <kbd className="rounded-md border border-border bg-panel2 px-1.5 py-0.5 font-mono text-[0.65rem] text-[#d9dde5]">C</kbd>
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
