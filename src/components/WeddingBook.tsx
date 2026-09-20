"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { content, type Language } from "@/lib/content";
import type { WeddingPhoto } from "@/lib/image-config";
import { HeroSection } from "./HeroSection";
import { IntroSection, CoupleSection, CinematicPhotos, InvitationSection } from "./StorySections";
import { WeddingDateSection } from "./WeddingDateSection";
import { GallerySection } from "./GallerySection";
import { VenueSection } from "./VenueSection";
import { ContactSection } from "./ContactSection";
import { AccountSection } from "./AccountSection";
import { ShareSection } from "./ShareSection";
import { EndingSection } from "./EndingSection";
import { MusicControl } from "./MusicControl";
import { ScrollMotion } from "./ScrollMotion";

export function WeddingBook({ images }: { images: { hero?: WeddingPhoto; story: WeddingPhoto[]; gallery: WeddingPhoto[]; ending?: WeddingPhoto } }) {
  const [language, setLanguage] = useState<Language>("ko");
  useEffect(() => {
    const stored = window.localStorage.getItem("wedding-language");
    if (stored === "ja" || stored === "ko") setLanguage(stored);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  function changeLanguage(next: Language) { setLanguage(next); window.localStorage.setItem("wedding-language", next); }
  const t = content[language];
  return (
    <main className={`wedding-book language-${language}`}>
      {process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY && <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js" strategy="afterInteractive" />}
      <ScrollMotion />
      <MusicControl t={t} />
      <HeroSection photo={images.hero} t={t} language={language} onLanguageChange={changeLanguage} />
      <IntroSection t={t} photo={images.story[0]} />
      <CoupleSection t={t} language={language} photo={images.story[1]} />
      <WeddingDateSection t={t} language={language} />
      <CinematicPhotos t={t} landscape={images.story[2]} closeup={images.story[3]} />
      <InvitationSection t={t} />
      <GallerySection photos={images.gallery} t={t} />
      <VenueSection t={t} language={language} />
      <ContactSection t={t} language={language} />
      <AccountSection t={t} />
      <ShareSection t={t} language={language} heroImage={images.hero?.src} />
      <EndingSection t={t} language={language} photo={images.ending} />
    </main>
  );
}
