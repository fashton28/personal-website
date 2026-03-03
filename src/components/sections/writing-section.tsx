import type { WritingItem } from "@/types/site";

export const writings: WritingItem[] = [
  {
    id: "writing-1",
    anchorId: "writing-lessons-2025",
    date: "2025-12-31",
    title: "Lessons from 2025"
  },
  {
    id: "writing-2",
    anchorId: "writing-presentation-generator",
    date: "2025-03-01",
    title: "Shipping a Presentation Generator in 3 Days"
  },
  {
    id: "writing-3",
    anchorId: "writing-reflecting-2024",
    date: "2024-12-29",
    title: "Reflecting on 2024"
  }
];

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

export function WritingSection() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="relative space-y-5">
      <p className="section-label">Writing</p>
      <h2 id="writing-title" className="sr-only">
        Writing
      </h2>

      <ul>
        {writings.map((item, index) => (
          <li
            key={item.id}
            id={item.anchorId}
            className={`flex items-center justify-between gap-4 py-3 text-[0.92rem] sm:text-[1.02rem] ${
              index !== writings.length - 1 ? "border-b border-border/40" : ""
            }`}
          >
            <span className="underline decoration-border/60 underline-offset-4 text-[#dce0e8]">
              {item.title}
            </span>
            <span className="shrink-0 font-mono text-[0.8rem] tracking-[0.04em] text-[#79808f]">
              {formatDate(item.date)}
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
