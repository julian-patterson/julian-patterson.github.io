import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-display",
  display: "swap",
});

const geistBody = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julian Patterson — Software Engineer",
  description:
    "Software engineer building practical systems across logistics, infrastructure, and product development.",
  openGraph: {
    title: "Julian Patterson",
    description: "Software engineer working across logistics, infrastructure, and product development.",
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
      className={`${geist.variable} ${geistBody.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
