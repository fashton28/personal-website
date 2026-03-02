"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CmdKButton } from "@/components/cmd-k-button";
import { CommandPalette } from "@/components/command-palette";
import BottomNav from "@/components/bottom-nav";
import { FooterSection, footerSectionMeta } from "@/components/sections/footer-section";
import { HeaderSection, headerSectionMeta, siteEmail } from "@/components/sections/header-section";
import { ProjectsSection, projectsSectionMeta } from "@/components/sections/projects-section";
import { SocialsSection, socialLinks, socialsSectionMeta } from "@/components/sections/socials-section";
import type { CommandActionItem } from "@/types/site";

const isTypingField = (element: EventTarget | null) => {
  if (!(element instanceof HTMLElement)) return false;

  if (element.isContentEditable) return true;

  const tagName = element.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select";
};

const baseSections = [
  headerSectionMeta,
  projectsSectionMeta,
  socialsSectionMeta,
  footerSectionMeta
];

const formatClock = () =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  }).format(new Date());

export function SiteShell() {
  const [open, setOpen] = useState(false);
  const [clockLabel, setClockLabel] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, []);

  const commandItems = useMemo<CommandActionItem[]>(() => {
    const sectionMeta: Record<string, { icon: string; description: string; shortcut: string; label?: string }> = {
      header: { icon: "home", description: "About me and what I'm up to", shortcut: "H", label: "Go to Home" },
      projects: { icon: "folder-kanban", description: "Work I've shipped", shortcut: "P" },
      socials: { icon: "users", description: "Find me online", shortcut: "S" },
      footer: { icon: "file-text", description: "The very bottom", shortcut: "F" }
    };

    const sectionItems: CommandActionItem[] = baseSections.map((section) => {
      const meta = sectionMeta[section.id];
      return {
        id: `section-${section.id}`,
        label: meta?.label ?? `Go to ${section.title}`,
        keywords: ["section", section.id],
        action: "scroll",
        sectionId: section.id,
        icon: meta?.icon,
        description: meta?.description,
        shortcut: meta?.shortcut
      };
    });

    const socialMeta: Record<string, { icon: string; shortcut: string }> = {
      "X.com": { icon: "x", shortcut: "X" },
      GitHub: { icon: "github", shortcut: "G" },
      LinkedIn: { icon: "linkedin", shortcut: "L" }
    };

    const socialItems: CommandActionItem[] = socialLinks
      .filter((social) => social.id !== "social-email")
      .map((social) => {
        const meta = socialMeta[social.label];
        return {
          id: `social-${social.id}`,
          label: social.label === "X.com" ? "X Profile" : `${social.label} Profile`,
          keywords: [social.value, "social", "contact"],
          action: "link",
          href: social.href,
          icon: meta?.icon ?? "external-link",
          shortcut: meta?.shortcut,
          description: social.value
        };
      });

    const linkItems: CommandActionItem[] = [
      ...socialItems,
      {
        id: "copy-email",
        label: "Email",
        keywords: ["mail", "contact", siteEmail],
        action: "copy-email",
        icon: "mail",
        shortcut: "E",
        description: siteEmail
      }
    ];

    return [...sectionItems, ...linkItems];
  }, []);

  const scrollToId = (sectionId?: string) => {
    if (!sectionId) return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCommandSelect = useCallback(
    async (item: CommandActionItem) => {
      if (item.action === "scroll") {
        scrollToId(item.sectionId);
      }

      if (item.action === "link" && item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }

      if (item.action === "copy-email") {
        await copyEmail();
      }

      setOpen(false);
    },
    [copyEmail]
  );

  useEffect(() => {
    setClockLabel(formatClock());
    const interval = window.setInterval(() => {
      setClockLabel(formatClock());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      const wantsCommandPalette = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (wantsCommandPalette) {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }

      if (event.key.toLowerCase() === "c" && !isTypingField(event.target)) {
        event.preventDefault();
        await copyEmail();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [copyEmail]);

  return (
    <>
      <main className="relative mx-auto w-full max-w-[780px] px-5 pb-28 pt-7 sm:px-9 sm:pt-10 lg:px-10 lg:pt-12">
        <div className="space-y-20">
          <div className="space-y-8">
            <HeaderSection clockLabel={clockLabel} copied={copied} />
            <SocialsSection />
            <ProjectsSection />
          </div>
          <FooterSection />
        </div>
      </main>

      <div className="fixed right-5 top-5 z-50">
        <CmdKButton onClick={() => setOpen(true)} />
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} items={commandItems} onSelect={handleCommandSelect} />
      <BottomNav/>
    </>
  );
}
