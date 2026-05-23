import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Praneeth — Full Stack DevOps Engineer",
  description:
    "Portfolio of Praneeth — Full Stack Developer specializing in microservices, Docker, Kubernetes, and AI automation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  );
}
