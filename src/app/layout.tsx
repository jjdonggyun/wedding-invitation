import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_JP, Noto_Sans_KR } from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";
import { getDateDisplay } from "@/lib/date";
import { getImagePlan } from "@/lib/image-config";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap", variable: "--font-serif" });
const korean = Noto_Sans_KR({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--font-korean" });
const japanese = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap", variable: "--font-japanese" });

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");
const heroImage = getImagePlan().hero?.src;
const title = `${weddingConfig.groom.ko} & ${weddingConfig.bride.ko} | Wedding Invitation`;
const description = `${getDateDisplay("ko").full} · ${weddingConfig.venue.ko}. 저희의 소중한 날에 초대합니다.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { type: "website", locale: "ko_KR", title, description, url: siteUrl, images: heroImage ? [{ url: heroImage, width: 1200, height: 1800, alt: title }] : [] },
  twitter: { card: "summary_large_image", title, description, images: heroImage ? [heroImage] : [] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fffaf8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${serif.variable} ${korean.variable} ${japanese.variable}`}>{children}</body></html>;
}
