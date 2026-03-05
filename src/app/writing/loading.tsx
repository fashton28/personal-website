export default function WritingLoading() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="shrink-0 px-5 pt-6 pb-4 sm:px-9">
        <div className="mx-auto max-w-[780px]">
          {/* Back link placeholder */}
          <div className="h-4 w-16 animate-pulse rounded bg-white/5" />
          <div className="mt-3">
            <div className="h-3 w-10 animate-pulse rounded bg-white/5" />
            <div className="mt-2 h-6 w-24 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </header>

      <div className="px-5 pb-20 sm:px-9">
        <ul className="mx-auto max-w-[780px]">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className={`flex items-center justify-between gap-4 py-3.5 ${
                i !== 2 ? "border-b border-border/40" : ""
              }`}
            >
              <div className="h-4 w-48 animate-pulse rounded bg-white/5 sm:w-64" />
              <div className="h-3 w-20 shrink-0 animate-pulse rounded bg-white/5" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
