"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/types";
import api from "@/lib/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/content/blogs");
        setBlogs(res.data.blogs ?? []);
      } catch {
        console.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
            Writing
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">Latest Blogs</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-56 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No blogs yet — check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 6).map((blog) => (
              <Link
                key={blog._id}
                href={`/blogs/${blog._id}`}
                className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map((tag) => (
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

                <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>{blog.views} views</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
