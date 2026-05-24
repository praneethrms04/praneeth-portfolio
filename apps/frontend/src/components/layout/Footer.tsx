export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white font-semibold">
          Praneeth<span className="text-blue-400">.</span>dev
        </div>
        <p className="text-gray-500 text-sm">
          © {year} Praneeth Kumar. Built with Next.js, Tailwind & Docker.
        </p>
      </div>
    </footer>
  );
}
