import type { WorkUpdateItem } from "@/types/site";

export const workUpdates: WorkUpdateItem[] = [
  {
    id: "work-1",
    anchorId: "work-2024-now",
    date: "2024 - NOW",
    title: "Design engineer",
    company: "Wait",
    summary: "Designed a realtime waitlist and dashboard for monitoring signups with live updates, reducing latency by 15%."
  },
  {
    id: "work-2",
    anchorId: "work-2024-omega",
    date: "2024 - NOW",
    title: "Design engineer",
    company: "Omega",
    summary: "Designed and built an admin panel for enterprise clients, scaling to support over 500 active users per instance."
  },
  {
    id: "work-3",
    anchorId: "work-2017-theta",
    date: "2017 - 2020",
    title: "Software engineer",
    company: "Theta",
    summary:
      "Developed the user interface for a crypto payment gateway, ensuring compliance with global accessibility standards."
  }
];

export function WorkSection() {
  return (
    <section id="my-work" aria-labelledby="my-work-title" className="relative space-y-6">

      <p className="section-label">My Work</p>
      <h2 id="my-work-title" className="max-w-3xl text-[1.62rem] tracking-tight text-[#c2c8d2] sm:text-[1.9rem]">
        Throughout my career, I&apos;ve worked on projects from scalable systems to user-friendly interfaces.
      </h2>

      <ol className="space-y-5">
        {workUpdates.map((item) => (
          <li key={item.id} id={item.anchorId} className="grid gap-3 sm:grid-cols-[132px_1fr] sm:gap-8">
            <p className="font-mono text-[0.9rem] uppercase tracking-[0.16em] text-[#7a818f]">{item.date}</p>
            <div className="space-y-2">
              <h3 className="text-[1.12rem] font-medium text-[#e4e8f0] sm:text-[1.45rem]">
                {item.title} at <span className="font-semibold text-white">{item.company}</span>
              </h3>
              <p className="max-w-2xl text-[1.02rem] leading-relaxed text-[#8f96a5] sm:text-[1.17rem]">{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export const workSectionMeta = {
  id: "my-work",
  title: "My Work"
};
