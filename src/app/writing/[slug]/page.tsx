import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: `${post.title} — Fabian Ashton` };
}

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="h-dvh overflow-y-auto">
      <div className="mx-auto max-w-[780px] px-5 pt-6 pb-24 sm:px-9">
        {/* Back link */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          <span className="text-[0.8rem]">Writing</span>
        </Link>

        {/* Header */}
        <header className="mt-6">
          <p className="section-label">{formatDate(post.date)}</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">{post.title}</h1>
        </header>

        {/* Article body */}
        <article
          className="prose mt-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
