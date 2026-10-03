import { PhotoFrame } from "./PhotoFrame";
import { LanguageToggle } from "./LanguageToggle";
import type { WeddingPhoto } from "@/lib/image-config";
import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";

export function HeroSection({ photo, t, language, onLanguageChange }: { photo?: WeddingPhoto; t: WeddingCopy; language: Language; onLanguageChange: (next: Language) => void }) {
  const date = getDateDisplay(language);
  return (
    <header className="hero" id="top">
      <div className="hero-topline">
        <span className="hero-datestamp">SEOUL · DECEMBER 2026</span>
        <LanguageToggle language={language} onChange={onLanguageChange} />
      </div>
      <div className="hero-cover">
        <div className="hero-heading">
          <p>{t.eyebrow}</p>
          <h1><span>{weddingConfig.groom.en}</span><em>&amp;</em><span>{weddingConfig.bride.en}</span></h1>
        </div>
        <div className="hero-photo-card">
          <PhotoFrame photo={photo} alt={`${weddingConfig.groom.ko}과 ${weddingConfig.bride.ko}의 웨딩 사진`} className="hero-photo" sizes="(max-width: 480px) 82vw, 390px" priority position="center 72%" placeholderLabel="OUR WEDDING DAY" />
          <span className="hero-photo-mark" aria-hidden="true">D + T</span>
        </div>
        <div className="hero-date-lockup">
          <span className="hero-date-big">{String(date.month).padStart(2, "0")}.{String(date.day).padStart(2, "0")}</span>
          <span>{date.year}</span>
          <i aria-hidden="true" />
          <span>{date.time}</span>
        </div>
        <p className="hero-script">{t.coverScript}</p>
      </div>
      <div className="hero-bottom"><a className="scroll-cue" href="#our-story"><span>{t.scroll}</span><i aria-hidden="true" /></a></div>
    </header>
  );
}
