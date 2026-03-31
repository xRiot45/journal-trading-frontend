"use client";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { EditorTooltip } from "./EditorTooltip";

export interface ToggleItem {
  value: string;
  icon: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface EditorToggleGroupProps {
  items: ToggleItem[];
  activeValues: string[];
  onToggle: (value: string) => void;
  className?: string;
}

export function EditorToggleGroup({
  items,
  activeValues,
  onToggle,
  className,
}: EditorToggleGroupProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {items.map((item) => {
        const isActive = activeValues.includes(item.value);

        return (
          <EditorTooltip
            key={item.value}
            content={item.label}
            shortcut={item.shortcut}
          >
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                if (!item.disabled) onToggle(item.value);
              }}
              disabled={item.disabled}
              aria-label={item.label}
              aria-pressed={isActive}
              data-state={isActive ? "on" : "off"}
              className={cn(
                "relative inline-flex h-8 w-8 items-center justify-center rounded-md text-base",
                "transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ring)]",
                "disabled:pointer-events-none disabled:opacity-40",
                isActive
                  ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                  : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              )}
            >
              <Icon icon={item.icon} width={16} height={16} />
            </button>
          </EditorTooltip>
        );
      })}
    </div>
  );
}
