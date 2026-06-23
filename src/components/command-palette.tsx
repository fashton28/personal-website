"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Box,
  ExternalLink,
  FileText,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  Mail,
  PenTool,
  Search as SearchIcon,
  Users,
  X as XIcon
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { CommandActionItem } from "@/types/site";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  "folder-kanban": FolderKanban,
  users: Users,
  "pen-tool": PenTool,
  "file-text": FileText,
  box: Box,
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  x: XIcon,
  "external-link": ExternalLink
};

function getIcon(name?: string): LucideIcon {
  if (name && iconMap[name]) return iconMap[name];
  return SearchIcon;
}

function itemValue(item: CommandActionItem) {
  return [item.label, ...item.keywords].join(" ");
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandActionItem[];
  onSelect: (item: CommandActionItem) => void;
}

export function CommandPalette({ open, onOpenChange, items, onSelect }: CommandPaletteProps) {
  const [highlightedValue, setHighlightedValue] = useState("");

  // Group items by their `group` heading, preserving a preferred order.
  const groups = useMemo(() => {
    const order = ["Projects", "Writing", "Links"];
    const byGroup = new Map<string, CommandActionItem[]>();
    for (const item of items) {
      const key = item.group ?? "More";
      if (!byGroup.has(key)) byGroup.set(key, []);
      byGroup.get(key)!.push(item);
    }
    const ordered: Array<[string, CommandActionItem[]]> = [];
    for (const key of order) {
      if (byGroup.has(key)) ordered.push([key, byGroup.get(key)!]);
    }
    for (const [key, list] of byGroup) {
      if (!order.includes(key)) ordered.push([key, list]);
    }
    return ordered;
  }, [items]);

  const highlightedItem = useMemo(() => {
    if (!highlightedValue) return items[0];
    return items.find((i) => itemValue(i).toLowerCase() === highlightedValue.toLowerCase());
  }, [items, highlightedValue]);

  const PreviewIcon = getIcon(highlightedItem?.icon);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <Command shouldFilter loop value={highlightedValue} onValueChange={setHighlightedValue}>
          {/* Preview header */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
              <PreviewIcon className="h-5 w-5 text-white/60" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {highlightedItem?.label ?? "Command Palette"}
              </p>
              {highlightedItem?.description && (
                <p className="truncate text-sm text-white/40">{highlightedItem.description}</p>
              )}
            </div>
          </div>

          <CommandInput placeholder="Search projects, writing…" />

          <CommandList>
            <CommandEmpty>No matches found.</CommandEmpty>

            {groups.map(([heading, groupItems], groupIndex) => (
              <Fragment key={heading}>
                {groupIndex > 0 && <CommandSeparator />}
                <CommandGroup heading={heading}>
                  {groupItems.map((item) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <CommandItem
                        key={item.id}
                        value={itemValue(item)}
                        onSelect={() => onSelect(item)}
                      >
                        <Icon className="h-4 w-4 text-white/40" />
                        <span className="truncate">{item.label}</span>
                        {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Fragment>
            ))}
          </CommandList>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <span>Type</span>
              <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] text-white/50">↑</kbd>
              <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] text-white/50">↓</kbd>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <span>Press</span>
              <kbd className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px] text-white/50">esc</kbd>
              <span>to close</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
