
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://xeno-portfolio.vercel.app"
  ),
  title: "Noly Sereño | Full-Stack Developer",
  description:
    "Personal portfolio of Noly Sereño — a Full-Stack Developer building modern, responsive, and scalable web applications with Next.js, React, and TypeScript.",
  openGraph: {
    title: "Noly Sereño | Full-Stack Developer",
    description:
      "Personal portfolio of Noly Sereño — building modern, responsive, and scalable web applications.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noly Sereño — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noly Sereño | Full-Stack Developer",
    description:
      "Personal portfolio of Noly Sereño — building modern, responsive, and scalable web applications.",
    images: ["/og-image.png"],
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
