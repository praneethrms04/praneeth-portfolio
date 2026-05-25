"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Blog } from "@/types";
import { renderMarkdown } from "@/lib/markdown";

type Mode = "create" | "edit";

interface Props {
  mode: Mode;
  initial?: Partial<Blog>;
  blogId?: string;
}

export default function BlogEditor({ mode, initial, blogId }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [tagsText, setTagsText] = useState(initial?.tags?.join(", ") ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);

  const submit = async (publishOverride?: boolean) => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    const payload = {
      title: title.trim(),
      summary: summary.trim() || undefined,
      coverImage: coverImage.trim() || undefined,
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      content,
      published: publishOverride ?? published,
    };

    setSaving(true);
    try {
      if (mode === "create") {
        const res = await api.post("/content/blogs", payload);
        toast.success(payload.published ? "Blog published" : "Draft saved");
        router.push(`/admin/blogs/${res.data.blog._id}`);
      } else if (blogId) {
        await api.put(`/content/blogs/${blogId}`, payload);
        setPublished(payload.published);
        toast.success(payload.published ? "Blog published" : "Saved as draft");
      }
    } catch (err) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error ?? "Failed to save";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/blogs"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Back to admin
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => submit(false)}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => submit(true)}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {published ? "Update & Publish" : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
          className="w-full text-4xl md:text-5xl font-bold bg-transparent text-white placeholder-gray-600 focus:outline-none border-b border-white/10 pb-3"
        />

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Short summary shown on the blog list (optional)"
          rows={2}
          className="w-full bg-transparent text-gray-300 placeholder-gray-600 focus:outline-none resize-none border-b border-white/10 pb-3"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="Tags (comma separated)"
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Cover image URL (optional)"
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex border-b border-white/10">
          <button
            onClick={() => setTab("write")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "write"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setTab("preview")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "preview"
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Preview
          </button>
          <div className="ml-auto py-2 text-xs text-gray-500">
            Markdown supported · {content.trim().split(/\s+/).filter(Boolean).length} words
          </div>
        </div>

        {tab === "write" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`# Write your blog in Markdown\n\nUse **bold**, *italic*, [links](https://...), \`code\`, and triple-backtick blocks for code.\n\n- bullet points\n- like this\n\n## Subheadings work too`}
            rows={20}
            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm leading-relaxed resize-y"
          />
        ) : (
          <div
            className="prose-blog px-5 py-4 rounded-xl bg-white/5 border border-white/10 min-h-[400px] text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: content
                ? renderMarkdown(content)
                : '<p class="text-gray-600">Nothing to preview yet.</p>',
            }}
          />
        )}
      </div>
    </div>
  );
}
