"use client";

import  { useState, useCallback } from "react";
import { type Editor } from "@tiptap/react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { EditorButton } from "./EditorButton";
import { EditorToggleGroup } from "./EditorToggleGroup";
import { EditorTooltip } from "./EditorTooltip";
import { LinkDialog } from "./LinkDialog";
import { ImageDialog } from "./ImageDialog";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  editor: Editor;
  disabled?: boolean;
  showHtmlToggle?: boolean;
  isHtmlMode?: boolean;
  onHtmlModeToggle?: () => void;
}

// Heading dropdown
function HeadingDropdown({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  const headings = [
    { level: 0, label: "Paragraph", icon: "mdi:format-paragraph" },
    { level: 1, label: "Heading 1", icon: "mdi:format-header-1" },
    { level: 2, label: "Heading 2", icon: "mdi:format-header-2" },
    { level: 3, label: "Heading 3", icon: "mdi:format-header-3" },
    { level: 4, label: "Heading 4", icon: "mdi:format-header-4" },
    { level: 5, label: "Heading 5", icon: "mdi:format-header-5" },
    { level: 6, label: "Heading 6", icon: "mdi:format-header-6" },
  ] as const;

  const currentHeading =
    headings.find(
      (h) =>
        h.level !== 0 &&
        editor.isActive("heading", { level: h.level })
    ) ?? headings[0];

  const handleSelect = (level: number) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
        .run();
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <EditorTooltip content="Text Style">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
          className={cn(
            "flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-ring)",
            "text-(--color-muted-foreground) hover:bg-(--color-muted) hover:text-(--color-foreground)",
            open && "bg-(--color-muted) text-(--color-foreground)"
          )}
        >
          <Icon icon={currentHeading.icon} width={15} height={15} />
          <span className="hidden sm:inline w-16 text-left truncate">
            {currentHeading.label}
          </span>
          <Icon
            icon="mdi:chevron-down"
            width={13}
            height={13}
            className={cn(
              "transition-transform duration-150",
              open && "rotate-180"
            )}
          />
        </button>
      </EditorTooltip>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onMouseDown={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-1 min-w-40 rounded-lg border border-(--color-border) bg-(--color-background) p-1 shadow-lg">
            {headings.map((h) => (
              <button
                key={h.level}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(h.level);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors",
                  h.level === currentHeading.level
                    ? "bg-(--color-foreground) text-(--color-background)"
                    : "hover:bg-(--color-muted) text-(--color-foreground)"
                )}
              >
                <Icon icon={h.icon} width={16} height={16} />
                <span
                  className={cn(
                    h.level === 1 && "text-lg font-bold",
                    h.level === 2 && "text-base font-bold",
                    h.level === 3 && "text-sm font-semibold",
                    h.level === 4 && "text-sm font-medium",
                    h.level === 5 && "text-xs font-medium",
                    h.level === 6 && "text-xs font-normal"
                  )}
                >
                  {h.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Color picker
function ColorPicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);

  const colors = [
    { value: "", label: "Default" },
    { value: "#000000", label: "Black" },
    { value: "#374151", label: "Dark Gray" },
    { value: "#6B7280", label: "Gray" },
    { value: "#9CA3AF", label: "Light Gray" },
    { value: "#EF4444", label: "Red" },
    { value: "#F97316", label: "Orange" },
    { value: "#EAB308", label: "Yellow" },
    { value: "#22C55E", label: "Green" },
    { value: "#3B82F6", label: "Blue" },
    { value: "#8B5CF6", label: "Purple" },
    { value: "#EC4899", label: "Pink" },
  ];

  const currentColor = editor.getAttributes("textStyle").color ?? "";

  return (
    <div className="relative">
      <EditorTooltip content="Text Color">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150",
            "hover:bg-(--color-muted) focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-ring)",
            open && "bg-(--color-muted)"
          )}
        >
          <div className="relative flex flex-col items-center">
            <Icon
              icon="mdi:format-color-text"
              width={16}
              height={16}
              className="text-(--color-muted-foreground)"
            />
            <div
              className="absolute -bottom-0.5 h-1 w-4 rounded-full"
              style={{
                backgroundColor: currentColor || "var(--color-foreground)",
              }}
            />
          </div>
        </button>
      </EditorTooltip>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onMouseDown={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 shadow-lg w-44">
            <p className="text-[10px] font-medium text-(--color-muted-foreground) uppercase tracking-wider mb-2">
              Text Color
            </p>
            <div className="grid grid-cols-6 gap-1.5">
              {colors.map((color) => (
                <EditorTooltip key={color.value} content={color.label}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (color.value) {
                        editor
                          .chain()
                          .focus()
                          .setColor(color.value)
                          .run();
                      } else {
                        editor.chain().focus().unsetColor().run();
                      }
                      setOpen(false);
                    }}
                    className={cn(
                      "h-5 w-5 rounded-full border transition-transform hover:scale-110",
                      color.value === currentColor
                        ? "border-[var(--color-foreground)] ring-1 ring-[var(--color-foreground)] ring-offset-1"
                        : "border-[var(--color-border)]"
                    )}
                    style={{
                      backgroundColor: color.value || "transparent",
                      backgroundImage: !color.value
                        ? "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)"
                        : undefined,
                      backgroundSize: !color.value ? "6px 6px" : undefined,
                      backgroundPosition: !color.value
                        ? "0 0, 3px 3px"
                        : undefined,
                    }}
                  />
                </EditorTooltip>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Table inserter
function TableInserter({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<{ rows: number; cols: number }>({
    rows: 0,
    cols: 0,
  });
  const maxRows = 6;
  const maxCols = 6;

  return (
    <div className="relative">
      <EditorTooltip content="Insert Table">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ring)]",
            "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            open && "bg-[var(--color-muted)] text-[var(--color-foreground)]"
          )}
        >
          <Icon icon="mdi:table-plus" width={16} height={16} />
        </button>
      </EditorTooltip>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onMouseDown={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-lg">
            <p className="text-[10px] font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider mb-2">
              {hovered.rows > 0
                ? `${hovered.rows} × ${hovered.cols} Table`
                : "Insert Table"}
            </p>
            <div className="grid gap-0.5" style={{ gridTemplateRows: `repeat(${maxRows}, 1fr)` }}>
              {Array.from({ length: maxRows }).map((_, rowIdx) => (
                <div key={rowIdx} className="flex gap-0.5">
                  {Array.from({ length: maxCols }).map((_, colIdx) => (
                    <button
                      key={colIdx}
                      type="button"
                      onMouseEnter={() =>
                        setHovered({
                          rows: rowIdx + 1,
                          cols: colIdx + 1,
                        })
                      }
                      onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        editor
                          .chain()
                          .focus()
                          .insertTable({
                            rows: rowIdx + 1,
                            cols: colIdx + 1,
                            withHeaderRow: true,
                          })
                          .run();
                        setOpen(false);
                        setHovered({ rows: 0, cols: 0 });
                      }}
                      className={cn(
                        "h-5 w-5 rounded-sm border transition-colors",
                        rowIdx < hovered.rows && colIdx < hovered.cols
                          ? "bg-[var(--color-foreground)] border-[var(--color-foreground)]"
                          : "bg-[var(--color-muted)] border-[var(--color-border)] hover:bg-[var(--color-border)]"
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function EditorToolbar({
  editor,
  disabled = false,
  showHtmlToggle = false,
  isHtmlMode = false,
  onHtmlModeToggle,
}: EditorToolbarProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const isDisabled = disabled || isHtmlMode;

  // Active mark values for toggle group
  const activeFormatting: string[] = [
    editor.isActive("bold") && "bold",
    editor.isActive("italic") && "italic",
    editor.isActive("underline") && "underline",
    editor.isActive("strike") && "strike",
    editor.isActive("code") && "code",
    editor.isActive("highlight") && "highlight",
    editor.isActive("subscript") && "subscript",
    editor.isActive("superscript") && "superscript",
  ].filter(Boolean) as string[];

  const activeAlignment: string[] = [
    editor.isActive({ textAlign: "left" }) && "left",
    editor.isActive({ textAlign: "center" }) && "center",
    editor.isActive({ textAlign: "right" }) && "right",
    editor.isActive({ textAlign: "justify" }) && "justify",
  ].filter(Boolean) as string[];

  const handleToggle = useCallback(
    (value: string) => {
      switch (value) {
        case "bold":
          editor.chain().focus().toggleBold().run();
          break;
        case "italic":
          editor.chain().focus().toggleItalic().run();
          break;
        case "underline":
          editor.chain().focus().toggleUnderline().run();
          break;
        case "strike":
          editor.chain().focus().toggleStrike().run();
          break;
        case "code":
          editor.chain().focus().toggleCode().run();
          break;
        case "highlight":
          editor.chain().focus().toggleHighlight().run();
          break;
        case "subscript":
          editor.chain().focus().toggleSubscript().run();
          break;
        case "superscript":
          editor.chain().focus().toggleSuperscript().run();
          break;
      }
    },
    [editor]
  );

  const handleAlignToggle = useCallback(
    (value: string) => {
      editor.chain().focus().setTextAlign(value).run();
    },
    [editor]
  );

  return (
    <>
      <div
        className={cn(
          "flex flex-wrap items-center gap-0.5 gap-y-1 p-2 border-b border-[var(--color-border)]",
          "bg-[var(--color-background)] sticky top-0 z-10",
          isDisabled && "opacity-60 pointer-events-none"
        )}
        role="toolbar"
        aria-label="Editor toolbar"
      >
        {/* === HISTORY === */}
        <div className="flex items-center gap-0.5">
          <EditorButton
            icon="mdi:undo"
            label="Undo"
            shortcut="⌘Z"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          />
          <EditorButton
            icon="mdi:redo"
            label="Redo"
            shortcut="⌘⇧Z"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          />
        </div>

        <ToolbarDivider />

        {/* === TEXT STYLE DROPDOWN === */}
        <HeadingDropdown editor={editor} />

        <ToolbarDivider />

        {/* === INLINE FORMATTING === */}
        <EditorToggleGroup
          items={[
            {
              value: "bold",
              icon: "mdi:format-bold",
              label: "Bold",
              shortcut: "⌘B",
            },
            {
              value: "italic",
              icon: "mdi:format-italic",
              label: "Italic",
              shortcut: "⌘I",
            },
            {
              value: "underline",
              icon: "mdi:format-underline",
              label: "Underline",
              shortcut: "⌘U",
            },
            {
              value: "strike",
              icon: "mdi:format-strikethrough",
              label: "Strikethrough",
              shortcut: "⌘⇧S",
            },
            {
              value: "code",
              icon: "mdi:code-tags",
              label: "Inline Code",
              shortcut: "⌘E",
            },
          ]}
          activeValues={activeFormatting}
          onToggle={handleToggle}
        />

        <ToolbarDivider />

        {/* === EXTENDED FORMATTING === */}
        <EditorToggleGroup
          items={[
            {
              value: "highlight",
              icon: "mdi:marker",
              label: "Highlight",
              shortcut: "⌘⇧H",
            },
            {
              value: "subscript",
              icon: "mdi:format-subscript",
              label: "Subscript",
              shortcut: "⌘,",
            },
            {
              value: "superscript",
              icon: "mdi:format-superscript",
              label: "Superscript",
              shortcut: "⌘.",
            },
          ]}
          activeValues={activeFormatting}
          onToggle={handleToggle}
        />

        <ColorPicker editor={editor} />

        <ToolbarDivider />

        {/* === ALIGNMENT === */}
        <EditorToggleGroup
          items={[
            {
              value: "left",
              icon: "mdi:format-align-left",
              label: "Align Left",
              shortcut: "⌘⇧L",
            },
            {
              value: "center",
              icon: "mdi:format-align-center",
              label: "Align Center",
              shortcut: "⌘⇧E",
            },
            {
              value: "right",
              icon: "mdi:format-align-right",
              label: "Align Right",
              shortcut: "⌘⇧R",
            },
            {
              value: "justify",
              icon: "mdi:format-align-justify",
              label: "Justify",
              shortcut: "⌘⇧J",
            },
          ]}
          activeValues={activeAlignment}
          onToggle={handleAlignToggle}
        />

        <ToolbarDivider />

        {/* === LISTS === */}
        <div className="flex items-center gap-0.5">
          <EditorButton
            icon="mdi:format-list-bulleted"
            label="Bullet List"
            shortcut="⌘⇧8"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
          />
          <EditorButton
            icon="mdi:format-list-numbered"
            label="Numbered List"
            shortcut="⌘⇧7"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
          />
          <EditorButton
            icon="mdi:format-list-checks"
            label="Task List"
            shortcut="⌘⇧9"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            isActive={editor.isActive("taskList")}
          />
        </div>

        <ToolbarDivider />

        {/* === BLOCKS === */}
        <div className="flex items-center gap-0.5">
          <EditorButton
            icon="mdi:format-quote-open"
            label="Blockquote"
            shortcut="⌘⇧B"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
          />
          <EditorButton
            icon="mdi:code-braces"
            label="Code Block"
            shortcut="⌘⇧C"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
          />
          <EditorButton
            icon="mdi:minus"
            label="Horizontal Rule"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
        </div>

        <ToolbarDivider />

        {/* === INSERT === */}
        <div className="flex items-center gap-0.5">
          <EditorButton
            icon="mdi:link-variant"
            label={editor.isActive("link") ? "Edit Link" : "Insert Link"}
            shortcut="⌘K"
            onClick={() => setLinkDialogOpen(true)}
            isActive={editor.isActive("link")}
          />
          <EditorButton
            icon="mdi:image-plus"
            label="Insert Image"
            onClick={() => setImageDialogOpen(true)}
          />
          <TableInserter editor={editor} />
        </div>

        {/* Table controls — only when cursor is inside a table */}
        {editor.isActive("table") && (
          <>
            <ToolbarDivider />
            <div className="flex items-center gap-0.5">
              <EditorButton
                icon="mdi:table-column-plus-after"
                label="Add Column After"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
              />
              <EditorButton
                icon="mdi:table-column-remove"
                label="Delete Column"
                onClick={() => editor.chain().focus().deleteColumn().run()}
              />
              <EditorButton
                icon="mdi:table-row-plus-after"
                label="Add Row After"
                onClick={() => editor.chain().focus().addRowAfter().run()}
              />
              <EditorButton
                icon="mdi:table-row-remove"
                label="Delete Row"
                onClick={() => editor.chain().focus().deleteRow().run()}
              />
              <EditorButton
                icon="mdi:table-remove"
                label="Delete Table"
                onClick={() => editor.chain().focus().deleteTable().run()}
              />
            </div>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* === UTILITY === */}
        <div className="flex items-center gap-0.5">
          <EditorButton
            icon="mdi:format-clear"
            label="Clear Formatting"
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          />
          {showHtmlToggle && (
            <EditorTooltip content={isHtmlMode ? "Rich Text Mode" : "HTML Source"}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onHtmlModeToggle?.();
                }}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-ring)]",
                  isHtmlMode
                    ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                )}
              >
                <Icon icon="mdi:code-tags" width={14} height={14} />
                <span className="hidden sm:inline">HTML</span>
              </button>
            </EditorTooltip>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <LinkDialog
        editor={editor}
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
      />
      <ImageDialog
        editor={editor}
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
      />
    </>
  );
}

function ToolbarDivider() {
  return (
    <Separator
      orientation="vertical"
      className="h-5 mx-0.5 bg-[var(--color-border)]"
    />
  );
}
