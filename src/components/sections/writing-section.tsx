import { Clock3 } from "lucide-react";

import type { WritingItem } from "@/types/site";

export const writings: WritingItem[] = [
  {
    id: "writing-1",
    anchorId: "writing-think-like-designer-engineer",
    date: "21/02/25",
    title: "How to think like both a designer & engineer",
    readMinutes: 2
  },
  {
    id: "writing-2",
    anchorId: "writing-ui-performance",
    date: "16/02/25",
    title: "UI Performance",
    readMinutes: 4
  },
  {
    id: "writing-3",
    anchorId: "writing-ai-workflow",
    date: "12/02/25",
    title: "How AI is changing my workflow",
    readMinutes: 2
  },
  {
    id: "writing-4",
    anchorId: "writing-design-tokens",
    date: "11/01/25",
    title: "Design tokens 101",
    readMinutes: 2
  },
  {
    id: "writing-5",
    anchorId: "writing-hello-world",
    date: "01/01/25",
    title: "Hello world",
    readMinutes: 1
  }
];

export function WritingSection() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="relative space-y-5">

      <p className="section-label">Writing</p>
      <h2 id="writing-title" className="sr-only">
        Writing
      </h2>

      <ul className="overflow-hidden rounded-2xl border border-border/70 bg-[#090b10]">
        {writings.map((item, index) => (
          <li
            key={item.id}
            id={item.anchorId}
            className={`grid grid-cols-[92px_1fr_auto] items-center gap-3 px-4 py-3.5 text-[0.92rem] transition sm:grid-cols-[128px_1fr_auto] sm:px-6 sm:text-[1.02rem] ${
              index === 0 ? "bg-[#101218]" : ""
            } ${index !== writings.length - 1 ? "border-b border-border/55" : ""}`}
            aria-label={`${item.title} (${item.readMinutes} minute read)`}
          >
            <span className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-[#79808f]">{item.date}</span>
            <span className="text-[#dce0e8]">{item.title}</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[#8d93a2] sm:text-[0.88rem]">
              <Clock3 className="h-3.5 w-3.5" />
              {item.readMinutes}m
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const writingSectionMeta = {
  id: "writing",
  title: "Writing"
};
