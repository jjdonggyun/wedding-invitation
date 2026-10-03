import { PhotoFrame } from "./PhotoFrame";
import type { WeddingPhoto } from "@/lib/image-config";
import type { WeddingCopy } from "@/lib/content";

export function EndingSection({ t, photo }: { t: WeddingCopy; photo?: WeddingPhoto }) {
  return (
    <footer className="ending-section">
      <div className="ending-photo-wrap"><PhotoFrame photo={photo} alt="웨딩드레스를 입은 신부의 마지막 사진" className="ending-photo" placeholderLabel="A BEAUTIFUL BEGINNING" /><span className="ending-photo-caption">FOREVER, FROM THIS DAY</span></div>
      <div className="ending-content"><p className="ending-overline">{t.endingOverline}</p><p className="ending-message preline">{t.ending}</p><p className="ending-english">{t.endingEnglish}</p></div>
    </footer>
  );
}
