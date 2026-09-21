import { PhotoFrame } from "./PhotoFrame";
import { LanguageToggle } from "./LanguageToggle";
import type { WeddingPhoto } from "@/lib/image-config";
import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";

export function HeroSection({ photo, t, language, onLanguageChange }: { photo?: WeddingPhoto; t: WeddingCopy; language: Language; onLanguageChange: (next: Language) => void }) {
  return (
    <header className="hero" id="top">
      <PhotoFrame photo={photo} alt={`${weddingConfig.groom.ko}과 ${weddingConfig.bride.ko}의 웨딩 사진`} className="hero-photo" sizes="(max-width: 480px) 650px, 750px" priority position="center 64%" placeholderLabel="OUR WEDDING DAY" />
      <div className="hero-wash" />
      <div className="hero-film-grain" aria-hidden="true" />
      <div className="hero-topline"><span className="hero-datestamp">06 · 12 · 2026</span><LanguageToggle language={language} onChange={onLanguageChange} /></div>
      <div className="hero-title-block">
        <div className="hero-eyebrow">{t.coverKicker}</div>
        <p className="hero-script">{t.coverScript}</p>
      </div>
      <div className="hero-credits">
        <p>{t.eyebrow}</p>
        <h1><span>{weddingConfig.groom.en}</span><em>&amp;</em><span>{weddingConfig.bride.en}</span></h1>
        <div className="hero-credit-rule" />
        <p className="hero-date">{getDateDisplay(language).numeric} <span>·</span> {getDateDisplay(language).time}</p>
      </div>
      <div className="hero-bottom"><a className="scroll-cue" href="#our-story">{t.scroll}<i aria-hidden="true" /></a></div>
    </header>
  );
}
