"use client"

import { Search } from "lucide-react"

export function CmdKButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
      className="inline-flex h-9 items-center gap-3 pl-3 pr-2 bg-[#131316] rounded-[99px] overflow-hidden shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] transition-all duration-200 hover:brightness-125 active:scale-[0.97] cursor-pointer"
      aria-label="Open command palette"
    >
      <Search className="w-3.5 h-3.5 text-white/60" strokeWidth={2} />
      <span className="text-white/40 text-[13px] leading-5 font-normal">Search</span>
      <kbd className="inline-flex items-center gap-0.5 h-5 px-1.5 rounded-md bg-white/10 text-white/50 text-[11px] font-medium">
        <span className="text-[13px]">&#8984;</span>K
      </kbd>
    </button>
  )
}
