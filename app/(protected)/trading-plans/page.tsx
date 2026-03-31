"use client"

import React, { useState } from "react"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Icon } from "@iconify/react"
import { PairSelect } from "@/components/pair-select/pair-select"
import { useForm } from "react-hook-form"

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

export default function TradingPlansPage() {
    const [content, setContent] = useState(INITIAL_CONTENT)
    const [activeDemo, setActiveDemo] = useState<
        "full" | "minimal" | "readonly"
    >("full")

    return (
        <main className="min-h-screen bg-[var(--color-background)]">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
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
            </div>
        </main>
    )
}
