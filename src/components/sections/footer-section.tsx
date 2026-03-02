import { CloudSun, MapPin } from "lucide-react";

export function FooterSection() {
  return (
    <footer id="footer" className="relative space-y-8 border-t border-border/60 pt-8 text-center" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Footer
      </h2>

      <div className="space-y-1 text-[1.02rem] text-muted">
        <p>Built with Next.js </p>
        <p className="font-mono text-[0.86rem] uppercase tracking-[0.17em]">&copy; 2026 Fashton</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 pb-2 text-[0.9rem] text-[#878e9d] sm:flex-row sm:text-[0.95rem]">
        <p className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.16em]">
          <MapPin className="h-3.5 w-3.5" />
          Miami
        </p>
        <p className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.16em]">
          <CloudSun className="h-3.5 w-3.5" />
          28&deg;C
        </p>
      </div>
    </footer>
  );
}

export const footerSectionMeta = {
  id: "footer",
  title: "Footer"
};
