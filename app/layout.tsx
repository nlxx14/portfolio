
import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Noly Sereño | Full-Stack Developer",
  description:
    "Personal portfolio of Noly Sereño — a Full-Stack Developer building modern, responsive, and scalable web applications with Next.js, React, and TypeScript.",
  openGraph: {
    title: "Noly Sereño | Full-Stack Developer",
    description:
      "Personal portfolio of Noly Sereño — building modern, responsive, and scalable web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.variable} antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.remove("light")}}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
