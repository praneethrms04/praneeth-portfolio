"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import BlogEditor from "@/components/admin/BlogEditor";
import { useAuthStore } from "@/store/auth.store";
import { useAuthModalStore } from "@/store/authModal.store";

export default function NewBlogPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const openAuthModal = useAuthModalStore((s) => s.openModal);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasToken =
      isAuthenticated ||
      (typeof window !== "undefined" && localStorage.getItem("token"));
    if (!hasToken) {
      openAuthModal("login");
      router.replace("/");
      return;
    }
    setReady(true);
  }, [isAuthenticated, router, openAuthModal]);

  if (!ready) return null;

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <BlogEditor mode="create" />
    </main>
  );
}
