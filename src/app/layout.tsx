import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FerdiNet - Yüksək Sürətli Fiber İnternet",
  description: "FerdiNet — limitsiz GPON fiber optik internet, pulsuz quraşdırma, 7/24 dəstək.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}
