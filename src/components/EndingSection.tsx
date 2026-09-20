import { PhotoFrame } from "./PhotoFrame";
import type { WeddingPhoto } from "@/lib/image-config";
import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";

export function EndingSection({ t, language, photo }: { t: WeddingCopy; language: Language; photo?: WeddingPhoto }) {
  return (
    <footer className="ending-section">
      <div className="ending-photo-wrap"><PhotoFrame photo={photo} alt="웨딩드레스를 입은 신부의 마지막 사진" className="ending-photo" placeholderLabel="A BEAUTIFUL BEGINNING" /></div>
      <div className="ending-content"><span className="ending-star" aria-hidden="true">✳</span><p className="ending-message preline">{t.ending}</p><p className="ending-english">{t.endingEnglish}</p><div className="ending-rule" /><p className="ending-names">{weddingConfig.groom.en} <em>&amp;</em> {weddingConfig.bride.en}</p><p className="ending-date">{getDateDisplay(language).numeric}</p></div>
    </footer>
  );
}
