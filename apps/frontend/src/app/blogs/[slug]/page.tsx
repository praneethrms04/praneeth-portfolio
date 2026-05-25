"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { Blog } from "@/types";
import { renderMarkdown } from "@/lib/markdown";

export default function BlogReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get(`/content/blogs/${slug}`);
        if (!cancelled) setBlog(res.data.blog);
      } catch {
        if (!cancelled) setError("Blog not found.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {loading ? (
        <div className="pt-32 max-w-3xl mx-auto px-6">
          <div className="h-8 w-32 rounded bg-white/5 animate-pulse mb-6" />
          <div className="h-12 w-3/4 rounded bg-white/5 animate-pulse mb-4" />
          <div className="h-4 w-1/2 rounded bg-white/5 animate-pulse mb-10" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-4 rounded bg-white/5 animate-pulse"
                style={{ width: `${60 + ((i * 7) % 35)}%` }}
              />
            ))}
          </div>
        </div>
      ) : error || !blog ? (
        <div className="pt-32 max-w-3xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-6">{error ?? "Blog not found."}</p>
          <Link
            href="/blogs"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to all blogs
          </Link>
        </div>
      ) : (
        <article className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/blogs"
              className="text-sm text-gray-500 hover:text-white transition-colors inline-block mb-8"
            >
              ← All blogs
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap gap-2 mb-5">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                {blog.title}
              </h1>

              {blog.summary && (
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  {blog.summary}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 mb-10 border-b border-white/10">
                {blog.author?.name && (
                  <>
                    <span className="text-gray-300">{blog.author.name}</span>
                    <span>·</span>
                  </>
                )}
                <span>
                  {new Date(
                    blog.publishedAt ?? blog.createdAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>·</span>
                <span>{blog.readingTime ?? 1} min read</span>
                <span>·</span>
                <span>{blog.views ?? 0} views</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose-blog text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
            />
          </div>
        </article>
      )}

      <Footer />
    </main>
  );
}
