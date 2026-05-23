import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RegisterSW from "@/components/pwa/RegisterSW";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Praneeth — Full Stack DevOps Engineer",
  description:
    "Portfolio of Praneeth — Full Stack Developer specializing in microservices, Docker, Kubernetes, and AI automation",
  applicationName: "Praneeth.dev",
  appleWebApp: {
    capable: true,
    title: "Praneeth.dev",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black`}>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
