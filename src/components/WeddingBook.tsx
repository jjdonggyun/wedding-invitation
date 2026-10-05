"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

type ImagePlan = {
  hero?: WeddingPhoto;
  story: { intro?: WeddingPhoto; couple?: WeddingPhoto; cinematic: WeddingPhoto[] };
  gallery: WeddingPhoto[];
  ending?: WeddingPhoto;
};

export function WeddingBook({ images }: { images: ImagePlan }) {
  const bookRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>("ko");
  useLayoutEffect(() => {
    const book = bookRef.current;
    if (!book) return;

    let lockedWidth = 0;
    let animationFrame = 0;
    const lockHeroHeight = () => {
      const viewport = window.visualViewport;
      const width = Math.round(viewport?.width ?? window.innerWidth);
      const height = Math.round(viewport?.height ?? window.innerHeight);
      book.style.setProperty("--hero-initial-height", `${Math.min(900, Math.max(630, height))}px`);
      lockedWidth = width;
    };
    const handleViewportResize = () => {
      const width = Math.round(window.visualViewport?.width ?? window.innerWidth);
      if (Math.abs(width - lockedWidth) < 40) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(lockHeroHeight);
    };

    lockHeroHeight();
    window.addEventListener("resize", handleViewportResize);
    window.visualViewport?.addEventListener("resize", handleViewportResize);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleViewportResize);
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
    };
  }, []);
  useEffect(() => {
    const stored = window.localStorage.getItem("wedding-language");
    if (stored === "ja" || stored === "ko") setLanguage(stored);
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  function changeLanguage(next: Language) { setLanguage(next); window.localStorage.setItem("wedding-language", next); }
  const t = content[language];
  return (
    <main ref={bookRef} className={`wedding-book language-${language}`}>
      {process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY && <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js" strategy="afterInteractive" />}
      <ScrollMotion />
      <MusicControl t={t} />
      <HeroSection photo={images.hero} t={t} language={language} onLanguageChange={changeLanguage} />
      <IntroSection t={t} photo={images.story.intro} />
      <CoupleSection t={t} language={language} photo={images.story.couple} />
      <WeddingDateSection t={t} language={language} />
      <CinematicPhotos t={t} photos={images.story.cinematic} />
      <InvitationSection t={t} />
      <GallerySection photos={images.gallery} t={t} />
      <VenueSection t={t} language={language} />
      <ContactSection t={t} language={language} />
      <AccountSection t={t} language={language} />
      <ShareSection t={t} language={language} />
      <EndingSection t={t} photo={images.ending} />
    </main>
  );
}
