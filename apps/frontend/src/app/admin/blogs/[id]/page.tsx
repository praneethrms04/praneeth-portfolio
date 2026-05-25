"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import BlogEditor from "@/components/admin/BlogEditor";
import api from "@/lib/api";
import { Blog } from "@/types";
import { useAuthStore } from "@/store/auth.store";
import { useAuthModalStore } from "@/store/authModal.store";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const openAuthModal = useAuthModalStore((s) => s.openModal);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasToken =
      isAuthenticated ||
      (typeof window !== "undefined" && localStorage.getItem("token"));
    if (!hasToken) {
      openAuthModal("login");
      router.replace("/");
      return;
    }
    (async () => {
      try {
        const res = await api.get(`/content/blogs/${id}`);
        setBlog(res.data.blog);
      } catch {
        toast.error("Blog not found");
        router.replace("/admin/blogs");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isAuthenticated, router, openAuthModal]);

  if (loading) {
    return (
      <main className="bg-black min-h-screen">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-32 space-y-4">
          <div className="h-10 w-1/2 rounded bg-white/5 animate-pulse" />
          <div className="h-6 w-2/3 rounded bg-white/5 animate-pulse" />
          <div className="h-64 rounded bg-white/5 animate-pulse" />
        </div>
      </main>
    );
  }

  if (!blog) return null;

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <BlogEditor mode="edit" initial={blog} blogId={blog._id} />
    </main>
  );
}
