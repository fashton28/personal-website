export default function ProjectsLoading() {
  return (
    <div className="relative flex h-dvh items-center justify-center overflow-hidden">
      {/* Back link placeholder */}
      <div className="fixed left-5 top-4 h-7 w-20 animate-pulse rounded-full bg-white/5 sm:left-9 sm:top-6" />

      {/* Panel placeholder mirroring the cinematic reel layout */}
      <div className="mx-auto grid w-full max-w-[1040px] items-center gap-9 px-6 sm:gap-12 lg:grid-cols-2 lg:px-10">
        <div className="aspect-[16/10] w-full animate-pulse rounded-[24px] bg-white/5" />
        <div className="flex flex-col gap-4">
          <div className="h-6 w-28 animate-pulse rounded-full bg-white/5" />
          <div className="h-10 w-48 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />
          <div className="mt-2 h-9 w-36 animate-pulse rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}
