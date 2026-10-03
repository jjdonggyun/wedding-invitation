import { PhotoFrame } from "./PhotoFrame";
import type { WeddingPhoto } from "@/lib/image-config";
import type { Language, WeddingCopy } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

export function IntroSection({ t, photo }: { t: WeddingCopy; photo?: WeddingPhoto }) {
  return (
    <section className="intro-section section-pad" id="our-story">
      <div className="section-kicker">{t.ourWedding}</div>
      <h2 className="intro-title preline">{t.introTitle}</h2>
      <p className="intro-body preline">{t.introBody}</p>
      <div className="editorial-photo-wrap">
        <PhotoFrame photo={photo} alt="커튼 사이에서 서로를 바라보는 두 사람" className="editorial-photo" placeholderLabel="PHOTO 02" />
        <span className="editorial-index">THE BEGINNING · 2026</span>
      </div>
    </section>
  );
}

export function CoupleSection({ t, language, photo }: { t: WeddingCopy; language: Language; photo?: WeddingPhoto }) {
  return (
    <section className="couple-section">
      <div className="couple-heading section-pad">
        <p className="serif-quote">{t.storyQuote}</p>
        <p className="quote-caption">{t.storyCaption}</p>
      </div>
      <PhotoFrame photo={photo} alt="함께 손을 잡은 신랑과 신부" className="couple-photo" placeholderLabel="PHOTO 03" />
      <div className="couple-names">
        <div><span className="small-label">{t.groom}</span><strong>{weddingConfig.groom[language]}</strong><small>{weddingConfig.groom.en}</small></div>
        <span className="couple-amp">&amp;</span>
        <div><span className="small-label">{t.bride}</span><strong>{weddingConfig.bride[language]}</strong><small>{weddingConfig.bride.en}</small></div>
      </div>
      <div className="family-lines section-pad">
        <p><span>{weddingConfig.family.groomParents[language]}</span><small>{language === "ko" ? "의" : "の"} {weddingConfig.family.groomRelation[language]}</small><strong>{language === "ko" ? "동균" : "ドンギュン"}</strong></p>
        <p><span>{weddingConfig.family.brideParents[language]}</span><small>{language === "ko" ? "의" : "の"} {weddingConfig.family.brideRelation[language]}</small><strong>{language === "ko" ? "츠키나" : "ツキナ"}</strong></p>
      </div>
    </section>
  );
}

export function CinematicPhotos({ t, landscape, closeup }: { t: WeddingCopy; landscape?: WeddingPhoto; closeup?: WeddingPhoto }) {
  return (
    <section className="cinematic-section" aria-label={t.together}>
      <div className="film-stage">
        <p className="film-stage-overline">OUR MOMENTS <span>—</span> 2026</p>
        <PhotoFrame photo={landscape} alt="베일 아래 마주 선 두 사람" className="cinematic-landscape" placeholderLabel="PHOTO 04" />
        <div className="cinematic-caption"><span>{t.together}</span></div>
      </div>
      <div className="closeup-wrap"><PhotoFrame photo={closeup} alt="꽃다발을 든 두 사람의 다정한 순간" className="cinematic-closeup" placeholderLabel="PHOTO 05" /></div>
      <p className="cinematic-script">Always, side by side.</p>
    </section>
  );
}

export function InvitationSection({ t }: { t: WeddingCopy }) {
  return (
    <section className="invitation-section section-pad">
      <p className="eyebrow">{t.invitationEyebrow}</p>
      <h2>{t.invitationTitle}</h2>
      <p className="preline">{t.invitationBody}</p>
    </section>
  );
}
