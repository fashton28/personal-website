export default function PostLoading() {
  return (
    <div className="h-dvh overflow-y-auto">
      <div className="mx-auto max-w-[780px] px-5 pt-6 pb-24 sm:px-9">
        {/* Back link placeholder */}
        <div className="h-4 w-20 animate-pulse rounded bg-white/5" />

        {/* Header */}
        <div className="mt-6">
          <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
          <div className="mt-3 h-7 w-72 animate-pulse rounded bg-white/5" />
        </div>

        {/* Paragraph lines */}
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}
