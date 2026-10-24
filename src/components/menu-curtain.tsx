"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
];

export function MenuCurtain() {
  const [open, setOpen] = useState(false);

  // Close on Escape.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center bg-[#131316] rounded-[99px] overflow-hidden shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] transition-all duration-200 hover:brightness-125 active:scale-[0.97] cursor-pointer"
      >
        <Menu className="h-3.5 w-3.5 text-white/70" strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="curtain"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[color:var(--curtain-bg)] text-[color:var(--curtain-text)]"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-end p-5 sm:p-9">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-60 active:scale-[0.97]"
              >
                <X className="h-6 w-6" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-5 pb-20 font-serif sm:items-start sm:gap-4 sm:px-9">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Mobile: centered, with pr-8 mirroring the number slot (w-6 + gap-2) so the word itself sits on the center line.
                      sm+: left-aligned so the wider italic face only grows rightward on hover - no jitter. */}
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group inline-flex items-baseline gap-2 pr-8 outline-none sm:gap-3 sm:pr-0"
                  >
                    <span aria-hidden className="w-6 text-base italic opacity-80 sm:w-8 sm:text-2xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-6xl font-medium leading-[1.1] sm:text-8xl group-hover:italic group-focus-visible:italic">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
