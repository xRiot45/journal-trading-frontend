"use client"

import React, { useState } from "react"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Icon } from "@iconify/react"

const INITIAL_CONTENT = `<h1>Welcome to Rich Text Editor ✨</h1>
<p>This is a <strong>powerful</strong>, <em>beautiful</em>, and <u>fully-featured</u> rich text editor built with <strong>TipTap</strong>, <strong>Next.js</strong>, <strong>Tailwind CSS v4</strong>, and <strong>shadcn/ui</strong>.</p>

<h2>✦ Features Overview</h2>
<p>This editor supports a wide range of formatting options:</p>

<h3>Text Formatting</h3>
<ul>
  <li><strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, <s>Strikethrough</s></li>
  <li><code>Inline code</code> and <mark>highlighted text</mark></li>
  <li>Text<sub>subscript</sub> and Text<sup>superscript</sup></li>
  <li>Text alignment: left, center, right, justify</li>
  <li>Custom text colors</li>
</ul>

<h3>Structure & Blocks</h3>
<ol>
  <li>Headings (H1–H6)</li>
  <li>Bullet &amp; Numbered Lists</li>
  <li>Task Lists with checkboxes</li>
  <li>Blockquotes</li>
  <li>Code blocks</li>
  <li>Horizontal rules</li>
  <li>Tables</li>
</ol>

<blockquote>
  <p>"The best writing tool is the one that gets out of your way." — Every writer ever</p>
</blockquote>

<pre><code>// Example code block
const editor = useEditor({
  extensions: [StarterKit, Underline, ...],
  content: initialContent,
  onUpdate: ({ editor }) => {
    onChange(editor.getHTML());
  },
});</code></pre>

<h3>Rich Media</h3>
<p>Insert <strong>links</strong>, <strong>images</strong> (from URL or file upload), and <strong>tables</strong> with interactive column/row management.</p>

<h2>✦ Getting Started</h2>
<p>Import and use the component anywhere in your project:</p>
<pre><code>import { RichTextEditor } from "@/components/rich-text-editor";

export default function Page() {
  const [content, setContent] = useState("");
  return (
    &lt;RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Start writing..."
    /&gt;
  );
}</code></pre>`

export default function Home() {
    const [content, setContent] = useState(INITIAL_CONTENT)
    const [activeDemo, setActiveDemo] = useState<
        "full" | "minimal" | "readonly"
    >("full")
    const [showOutput, setShowOutput] = useState(false)

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            {/* Header */}
            <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
                <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-foreground)]">
                                <Icon
                                    icon="mdi:pencil-outline"
                                    className="text-[var(--color-background)]"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div>
                                <h1 className="text-sm leading-none font-semibold text-[var(--color-foreground)]">
                                    RichTextEditor
                                </h1>
                                <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                                    Next.js · TipTap · Tailwind v4 · shadcn/ui
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href="https://tiptap.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden items-center gap-1.5 text-xs text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)] sm:flex"
                            >
                                <Icon icon="mdi:open-in-new" width={13} />
                                TipTap Docs
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                {/* Demo mode switcher */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <p className="shrink-0 text-sm font-medium text-[var(--color-muted-foreground)]">
                        Demo mode:
                    </p>
                    <div className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] p-1">
                        {(
                            [
                                {
                                    key: "full",
                                    label: "Full Editor",
                                    icon: "mdi:pencil",
                                },
                                {
                                    key: "minimal",
                                    label: "Minimal",
                                    icon: "mdi:text",
                                },
                                {
                                    key: "readonly",
                                    label: "Read Only",
                                    icon: "mdi:eye-outline",
                                },
                            ] as const
                        ).map(({ key, label, icon }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveDemo(key)}
                                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                                    activeDemo === key
                                        ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                                        : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
                                }`}
                            >
                                <Icon icon={icon} width={13} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor */}
                {activeDemo === "full" && (
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Start writing something amazing..."
                        showCharCount
                        showWordCount
                        showHtmlToggle
                        maxChars={10000}
                        minHeight="520px"
                    />
                )}

                {activeDemo === "minimal" && (
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write a short description..."
                        showCharCount={false}
                        showWordCount={false}
                        showHtmlToggle={false}
                        minHeight="200px"
                    />
                )}

                {activeDemo === "readonly" && (
                    <RichTextEditor
                        value={content}
                        readOnly
                        showCharCount
                        showWordCount
                        minHeight="360px"
                    />
                )}

                {/* Output panel */}
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => setShowOutput((v) => !v)}
                        className="group flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                    >
                        <Icon
                            icon={
                                showOutput
                                    ? "mdi:chevron-down"
                                    : "mdi:chevron-right"
                            }
                            width={16}
                            className="transition-transform"
                        />
                        HTML Output
                        <span className="ml-1 inline-flex items-center rounded-full bg-[var(--color-muted)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-muted-foreground)]">
                            {content.length} chars
                        </span>
                    </button>

                    {showOutput && (
                        <div className="mt-3 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)]">
                            <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2">
                                <span className="font-mono text-xs text-[var(--color-muted-foreground)]">
                                    output.html
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigator.clipboard.writeText(content)
                                    }
                                    className="flex items-center gap-1 text-xs text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
                                >
                                    <Icon icon="mdi:content-copy" width={13} />
                                    Copy
                                </button>
                            </div>
                            <pre className="max-h-64 overflow-x-auto overflow-y-auto p-4 font-mono text-xs break-all whitespace-pre-wrap text-[var(--color-foreground)]">
                                {content || "<p></p>"}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Feature cards */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            icon: "mdi:format-text",
                            title: "Full Formatting",
                            desc: "Bold, italic, underline, strikethrough, highlight, subscript, superscript, and more.",
                        },
                        {
                            icon: "mdi:format-list-bulleted",
                            title: "Lists & Structure",
                            desc: "Bullet, numbered, and task lists. Headings H1–H6, blockquotes, code blocks.",
                        },
                        {
                            icon: "mdi:table-plus",
                            title: "Tables",
                            desc: "Insert tables with hover grid picker. Add/remove rows and columns on the fly.",
                        },
                        {
                            icon: "mdi:link-variant",
                            title: "Links & Images",
                            desc: "Insert links with dialog. Add images from URL or local file upload.",
                        },
                        {
                            icon: "mdi:palette-outline",
                            title: "Text Colors",
                            desc: "12 preset colors to style your text. Click to apply or reset to default.",
                        },
                        {
                            icon: "mdi:code-tags",
                            title: "HTML Source",
                            desc: "Toggle to raw HTML mode to directly edit or inspect the source output.",
                        },
                    ].map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            className="group rounded-xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-foreground)]"
                        >
                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-muted)] transition-colors group-hover:bg-[var(--color-foreground)]">
                                <Icon
                                    icon={icon}
                                    width={16}
                                    className="text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-background)]"
                                />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-[var(--color-foreground)]">
                                {title}
                            </h3>
                            <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
