import type { Metadata, Viewport } from "next";
import "./globals.css";
import SwRegister from "@/components/SwRegister";

export const metadata: Metadata = {
  title: "FerdiNet - Yüksək Sürətli Fiber İnternet",
  description: "FerdiNet — limitsiz GPON fiber optik internet, pulsuz quraşdırma, 7/24 dəstək.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FerdiNet",
  },
};

export const viewport: Viewport = {
  themeColor: "#2e9e4d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <head></head>
      <body>
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
