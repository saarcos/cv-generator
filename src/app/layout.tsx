import type { Metadata } from "next";
import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const fugazOne = Fugaz_One({
  variable: "--font-fugaz-one",
  subsets: ["latin"],
  weight: "400", // ✅ esto es lo que te faltaba
});

export const metadata: Metadata = {
  title: "GenCV",
  description: "Generate a customized resume using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fugazOne.variable} antialiased w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
