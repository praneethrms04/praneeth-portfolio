export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📡</div>
        <h1 className="text-3xl font-bold mb-3">You're offline</h1>
        <p className="text-gray-400 mb-8">
          This page isn't available without a connection. Check your network
          and try again.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          Retry
        </a>
      </div>
    </main>
  );
}
