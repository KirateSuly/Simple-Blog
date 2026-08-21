import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MusicProvider } from "@/components/music/MusicProvider";

export const metadata: Metadata = {
  title: "我的个人博客",
  description: "一个极致毛玻璃风格的个人博客，记录代码、文字与生活。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen overflow-x-hidden">
        <Background />
        <MusicProvider>
          <Navbar />
          <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6">
            {children}
          </main>
          <Footer />
        </MusicProvider>
      </body>
    </html>
  );
}
