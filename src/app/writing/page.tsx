import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { writings } from "@/components/sections/writing-section";

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

export default function WritingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
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
            <p className="section-label">Blog</p>
            <h1 className="mt-1 text-xl font-semibold text-white">Writing</h1>
          </div>
        </div>
      </header>

      {/* Writing list */}
      <div className="px-5 pb-20 sm:px-9">
        <ul className="mx-auto max-w-[780px]">
          {writings.map((item, index) => (
            <li
              key={item.id}
              id={item.anchorId}
              className={`flex items-center justify-between gap-4 py-3.5 text-[0.92rem] sm:text-[1.02rem] ${
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
      </div>
    </div>
  );
}
