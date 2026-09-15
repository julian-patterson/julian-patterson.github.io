import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const themeBootstrap = `(() => {
  let saved = null;
  try {
    saved = window.localStorage.getItem("jp-theme");
  } catch {}
  if (saved === "light" || saved === "dark") {
    document.documentElement.dataset.theme = saved;
  }
})();`;

export const metadata: Metadata = {
  title: "Julian Patterson — Software Engineer & Data Scientist",
  description:
    "McGill Software Engineering student, Founder & CTO of Stride. Building data-driven software — machine learning, full-stack platforms, and the operational systems behind them.",
  openGraph: {
    title: "Julian Patterson",
    description: "Software Engineer & Data Scientist — Montréal, QC",
    url: "https://julianpatterson.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
