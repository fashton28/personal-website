export function FooterSection() {
  return (
    <footer id="footer" className="relative text-center" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Footer
      </h2>

      <div className="space-y-0.5 text-[0.88rem] text-muted">
        <p>Built with Next.js </p>
        <p className="font-mono text-[0.78rem] uppercase tracking-[0.17em]">&copy; 2026 Fashton</p>
      </div>
    </footer>
  );
}

export const footerSectionMeta = {
  id: "footer",
  title: "Footer"
};
