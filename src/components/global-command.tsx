"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CommandPalette } from "@/components/command-palette";
import { siteEmail } from "@/components/sections/header-section";
import { socialLinks } from "@/components/sections/socials-section";
import { projects } from "@/data/projects";
import type { PostMeta } from "@/lib/posts";
import type { CommandActionItem } from "@/types/site";

const socialMeta: Record<string, { icon: string }> = {
  "X.com": { icon: "x" },
  GitHub: { icon: "github" },
  LinkedIn: { icon: "linkedin" },
};

export function GlobalCommand({ posts }: { posts: PostMeta[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commandItems = useMemo<CommandActionItem[]>(() => {
    // Projects — searchable by title, summary, and tech tags.
    const projectItems: CommandActionItem[] = projects.map((project) => ({
      id: `project-${project.id}`,
      label: project.title,
      keywords: [...project.tags, project.summary, "project", "work"],
      action: "route",
      href: `/projects#${project.anchorId}`,
      icon: "folder-kanban",
      description: project.summary,
      group: "Projects",
    }));

    // Writing — searchable by title and summary.
    const writingItems: CommandActionItem[] = posts.map((post) => ({
      id: `post-${post.slug}`,
      label: post.title,
      keywords: ["writing", "blog", "post", post.summary ?? ""],
      action: "route",
      href: `/writing/${post.slug}`,
      icon: "file-text",
      description: post.summary ?? post.date,
      group: "Writing",
    }));

    // Links — socials + email (ways to reach me).
    const socialItems: CommandActionItem[] = socialLinks
      .filter((social) => social.id !== "social-email")
      .map((social) => ({
        id: `social-${social.id}`,
        label: social.label === "X.com" ? "X" : social.label,
        keywords: [social.value, "social", "contact", social.label],
        action: "link",
        href: social.href,
        icon: socialMeta[social.label]?.icon ?? "external-link",
        description: social.href.replace(/^https?:\/\/(www\.)?/, ""),
        group: "Links",
      }));

    const emailItem: CommandActionItem = {
      id: "copy-email",
      label: "Copy email",
      keywords: ["mail", "contact", "email", siteEmail],
      action: "copy-email",
      icon: "mail",
      description: siteEmail,
      group: "Links",
    };

    return [...projectItems, ...writingItems, ...socialItems, emailItem];
  }, [posts]);

  const handleCommandSelect = useCallback(
    async (item: CommandActionItem) => {
      if (item.action === "route" && item.href) {
        router.push(item.href);
      }

      if (item.action === "link" && item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }

      if (item.action === "copy-email") {
        try {
          await navigator.clipboard.writeText(siteEmail);
        } catch {
          /* ignore */
        }
      }

      setOpen(false);
    },
    [router],
  );

  useEffect(() => {
    router.prefetch("/projects");
    router.prefetch("/writing");
  }, [router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    const onOpenRequest = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      items={commandItems}
      onSelect={handleCommandSelect}
    />
  );
}
