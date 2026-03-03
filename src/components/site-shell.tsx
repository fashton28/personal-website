"use client";

import { useCallback, useEffect, useState } from "react";

import { FooterSection } from "@/components/sections/footer-section";
import { HeaderSection, siteEmail } from "@/components/sections/header-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SocialsSection } from "@/components/sections/socials-section";

const isTypingField = (element: EventTarget | null) => {
  if (!(element instanceof HTMLElement)) return false;
  if (element.isContentEditable) return true;
  const tagName = element.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select";
};

const formatClock = () =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short"
  }).format(new Date());

export function SiteShell() {
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
      if (event.key.toLowerCase() === "c" && !isTypingField(event.target)) {
        event.preventDefault();
        await copyEmail();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [copyEmail]);

  return (
    <main className="relative mx-auto flex h-dvh w-full max-w-[780px] flex-col overflow-hidden px-5 pb-20 pt-4 sm:px-9 sm:pb-14 sm:pt-6 lg:px-10 lg:pt-7">
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-5">
          <HeaderSection clockLabel={clockLabel} copied={copied} />
          <ProjectsSection />
          <SocialsSection />
        </div>
        <FooterSection />
      </div>
    </main>
  );
}
