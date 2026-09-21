import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Sans_KR, Pinyon_Script } from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";
import { getDateDisplay } from "@/lib/date";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap", variable: "--font-serif" });
const korean = Noto_Sans_KR({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--font-korean" });
const japanese = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--font-japanese" });
const script = Pinyon_Script({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-script" });

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
const date = getDateDisplay("ko");
const title = `${date.month}월 ${date.day}일, ${weddingConfig.groom.ko} ♥ ${weddingConfig.bride.ko} 결혼합니다`;
const description = `${date.full} · ${weddingConfig.venue.ko} | 두 사람의 새로운 시작에 초대합니다.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { type: "website", locale: "ko_KR", title, description, url: siteUrl, siteName: "Dongkyun & Tsukina" },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fffaf8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${serif.variable} ${korean.variable} ${japanese.variable} ${script.variable}`}>{children}</body></html>;
}
