export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  image: string;
  imageClassName?: string;
  href?: string;
  anchorId: string;
  /** Small status/year label shown above the title, e.g. "2025 · Hackathon". Optional. */
  badge?: string;
  /** Accent color (hex) for this project's "View project" button, ideally matching its imagery. */
  accent?: string;
}

export interface WorkUpdateItem {
  id: string;
  date: string;
  title: string;
  company?: string;
  summary: string;
  anchorId: string;
}

export interface SocialLinkItem {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface CommandActionItem {
  id: string;
  label: string;
  keywords: string[];
  action: "scroll" | "route" | "link" | "copy-email";
  sectionId?: string;
  href?: string;
  icon?: string;
  description?: string;
  shortcut?: string;
}
