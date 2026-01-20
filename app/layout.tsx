import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WatchVia",
  description: "Find your next favorite movie or TV show with WatchVia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendDeca.className} antialiased `}>
        <AntdRegistry>
          <Navbar />
          {children}
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}
