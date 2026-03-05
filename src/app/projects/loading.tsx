export default function ProjectsLoading() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
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

      {/* Card placeholder */}
      <div className="flex flex-1 items-center justify-center">
        <div className="h-[400px] w-[320px] animate-pulse rounded-2xl bg-white/5 sm:w-[380px]" />
      </div>
    </div>
  );
}
