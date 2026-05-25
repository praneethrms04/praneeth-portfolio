"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useAuthModalStore } from "@/store/authModal.store";
import { Blog } from "@/types";

export default function AdminBlogsPage() {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();
  const openAuthModal = useAuthModalStore((s) => s.openModal);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasToken =
      isAuthenticated || (typeof window !== "undefined" && localStorage.getItem("token"));
    if (!hasToken) {
      openAuthModal("login");
      router.replace("/");
      return;
    }
    (async () => {
      try {
        const res = await api.get("/content/blogs?all=1");
        setBlogs(res.data.blogs ?? []);
      } catch {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, [isAuthenticated, token, router, openAuthModal]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog? This cannot be undone.")) return;
    try {
      await api.delete(`/content/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      const res = await api.put(`/content/blogs/${blog._id}`, {
        published: !blog.published,
      });
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? res.data.blog : b)),
      );
      toast.success(res.data.blog.published ? "Published" : "Unpublished");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      <section className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-blue-400 text-sm font-medium tracking-widest uppercase">
                Admin
              </span>
              <h1 className="text-4xl font-bold text-white mt-2">
                Your Blogs
              </h1>
            </div>
            <Link
              href="/admin/blogs/new"
              className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              + New Blog
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-gray-500 py-20 border border-dashed border-white/10 rounded-xl">
              No blogs yet. Click <span className="text-blue-400">+ New Blog</span> to write your first one.
            </div>
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          blog.published
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(blog.updatedAt ?? blog.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        · {blog.views ?? 0} views
                      </span>
                    </div>
                    <h3 className="text-white font-semibold truncate">
                      {blog.title}
                    </h3>
                    {blog.summary && (
                      <p className="text-sm text-gray-400 truncate mt-1">
                        {blog.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublish(blog)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      {blog.published ? "Unpublish" : "Publish"}
                    </button>
                    <Link
                      href={`/admin/blogs/${blog._id}`}
                      className="text-xs px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
