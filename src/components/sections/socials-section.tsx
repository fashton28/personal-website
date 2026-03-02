import { Github, Linkedin, Mail, X } from "lucide-react";

import type { SocialLinkItem } from "@/types/site";

export const socialLinks: SocialLinkItem[] = [
  {
    id: "social-email",
    label: "Email",
    value: "hi@jacobvos.com",
    href: "mailto:hi@jacobvos.com"
  },
  {
    id: "social-x",
    label: "X.com",
    value: "@jacob",
    href: "https://x.com/jacob"
  },
  {
    id: "social-github",
    label: "GitHub",
    value: "@jv",
    href: "https://github.com/jv"
  },
  {
    id: "social-linkedin",
    label: "LinkedIn",
    value: "/in/jacobvos",
    href: "https://linkedin.com/in/jacobvos"
  }
];

const iconMap = {
  Email: Mail,
  "X.com": X,
  GitHub: Github,
  LinkedIn: Linkedin
};

export function SocialsSection() {
  return (
    <section id="socials" aria-labelledby="socials-title" className="relative">
      <h2 id="socials-title" className="sr-only">
        Social links
      </h2>

      <ul className="flex flex-wrap items-center gap-4">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.label as keyof typeof iconMap] ?? Mail;

          return (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex text-[#a4acbb] transition hover:text-[#e6e9ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export const socialsSectionMeta = {
  id: "socials",
  title: "Socials"
};
