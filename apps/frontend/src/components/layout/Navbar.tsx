"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Praneeth<span className="text-blue-400">.</span>dev
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#about"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            About
          </Link>
          <Link
            href="/#projects"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Projects
          </Link>
          <Link
            href="/#blogs"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Hi, {user?.name}</span>
              <button
                onClick={logout}
                className="text-sm px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
