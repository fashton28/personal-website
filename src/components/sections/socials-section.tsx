import { Github, Linkedin, Mail, X } from "lucide-react";

import type { SocialLinkItem } from "@/types/site";

export const socialLinks: SocialLinkItem[] = [
  {
    id: "social-email",
    label: "Email",
    value: "fashton502@gmail.com",
    href: "mailto:fashton502@gmail.com"
  },
  {
    id: "social-x",
    label: "X.com",
    value: "@jacob",
    href: "https://x.com/FabianBuiltIt"
  },
  {
    id: "social-github",
    label: "GitHub",
    value: "@jv",
    href: "https://github.com/fashton28"
  },
  {
    id: "social-linkedin",
    label: "LinkedIn",
    value: "/in/jacobvos",
    href: "https://www.linkedin.com/in/fabian-ashton-b21b772ba/"
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

      <ul className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.label as keyof typeof iconMap] ?? Mail;

          return (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group inline-flex items-center text-[#a4acbb] transition-colors hover:text-[#e6e9ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="inline-block max-w-0 overflow-hidden opacity-0 transition-all duration-200 ease-out group-hover:max-w-24 group-hover:opacity-100">
                  <span className="pl-1.5 text-sm whitespace-nowrap">{link.label}</span>
                </span>
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
