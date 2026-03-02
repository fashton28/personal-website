export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  anchorId: string;
}

export interface WorkUpdateItem {
  id: string;
  date: string;
  title: string;
  company?: string;
  summary: string;
  anchorId: string;
}

export interface WritingItem {
  id: string;
  date: string;
  title: string;
  readMinutes: number;
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
  action: "scroll" | "link" | "copy-email";
  sectionId?: string;
  href?: string;
  icon?: string;
  description?: string;
  shortcut?: string;
}
