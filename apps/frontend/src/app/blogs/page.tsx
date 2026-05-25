"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { Blog } from "@/types";

export default function BlogsIndexPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get("/content/blogs");
        if (!cancelled) setBlogs(res.data.blogs ?? []);
      } catch {
        if (!cancelled) setError("Couldn't load blogs.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [blogs]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      if (activeTag && !b.tags?.includes(activeTag)) return false;
      if (query) {
        const q = query.toLowerCase();
        const inTitle = b.title?.toLowerCase().includes(q);
        const inSummary = b.summary?.toLowerCase().includes(q);
        if (!inTitle && !inSummary) return false;
      }
      return true;
    });
  }, [blogs, query, activeTag]);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
              Writing
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-4">
              Blog
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Notes on what I build — full stack engineering, microservices,
              DevOps, and the occasional debugging story.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blogs…"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    activeTag === null
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      activeTag === tag
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-20">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              {blogs.length === 0
                ? "No blogs published yet."
                : "No blogs match your search."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((blog, idx) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.3) }}
                >
                  <Link
                    href={`/blogs/${blog.slug ?? blog._id}`}
                    className="group block h-full p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {blog.summary ?? blog.content?.slice(0, 140)}
                    </p>

                    <div className="mt-auto pt-3 flex items-center justify-between text-xs text-gray-500 border-t border-white/5">
                      <span>
                        {new Date(
                          blog.publishedAt ?? blog.createdAt,
                        ).toLocaleDateString()}
                      </span>
                      <span>
                        {blog.readingTime ?? 1} min · {blog.views ?? 0} views
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
