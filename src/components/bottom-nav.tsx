"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderKanban, PenTool } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: PenTool, label: "Writing", href: "#" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <nav
        className="inline-flex h-10 items-center justify-center gap-0.5 overflow-hidden rounded-[99px] bg-[#131316] px-1 py-0 shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33]"
        role="toolbar"
        aria-label="Navigation toolbar"
      >
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.label}
            href={item.href}
            className={[
              "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200",
              isActive
                ? "bg-white/15 text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white",
            ].join(" ")}
            aria-label={item.label}
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        )
      })}
      </nav>
    </div>
  )
}
