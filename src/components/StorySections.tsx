import { PhotoFrame } from "./PhotoFrame";
import type { WeddingPhoto } from "@/lib/image-config";
import type { Language, WeddingCopy } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

export function IntroSection({ t, photo }: { t: WeddingCopy; photo?: WeddingPhoto }) {
  return (
    <section className="intro-section section-pad" id="our-story">
      <div className="section-kicker"><span className="tiny-diamond" />{t.ourWedding}<span className="tiny-diamond" /></div>
      <h2 className="intro-title preline">{t.introTitle}</h2>
      <p className="intro-body preline">{t.introBody}</p>
      <div className="intro-ornament" aria-hidden="true"><span />FOREVER<span /></div>
      <div className="editorial-photo-wrap">
        <PhotoFrame photo={photo} alt="커튼 사이에서 서로를 바라보는 두 사람" className="editorial-photo" placeholderLabel="PHOTO 02" />
        <span className="editorial-index">01 / THE BEGINNING</span>
      </div>
    </section>
  );
}

export function CoupleSection({ t, language, photo }: { t: WeddingCopy; language: Language; photo?: WeddingPhoto }) {
  return (
    <section className="couple-section">
      <p className="serif-quote">“{t.storyQuote}”</p>
      <p className="quote-caption">{t.storyCaption}</p>
      <PhotoFrame photo={photo} alt="함께 손을 잡은 신랑과 신부" className="couple-photo" placeholderLabel="PHOTO 03" />
      <div className="couple-names">
        <div><span className="small-label">{t.groom}</span><strong>{weddingConfig.groom[language]}</strong><small>{weddingConfig.groom.en}</small></div>
        <span className="couple-amp">&amp;</span>
        <div><span className="small-label">{t.bride}</span><strong>{weddingConfig.bride[language]}</strong><small>{weddingConfig.bride.en}</small></div>
      </div>
    </section>
  );
}

export function CinematicPhotos({ t, landscape, closeup }: { t: WeddingCopy; landscape?: WeddingPhoto; closeup?: WeddingPhoto }) {
  return (
    <section className="cinematic-section" aria-label={t.together}>
      <div className="film-stage">
        <p className="film-stage-overline">CHAPTER II <span>—</span> THE PROMISE</p>
        <PhotoFrame photo={landscape} alt="베일 아래 마주 선 두 사람" className="cinematic-landscape" placeholderLabel="PHOTO 04" />
        <div className="cinematic-caption"><span>IV</span><span>{t.together}</span></div>
        <p className="film-stage-under" aria-hidden="true">ONE LIFE <span>·</span> ONE LOVE</p>
      </div>
      <div className="closeup-wrap"><PhotoFrame photo={closeup} alt="꽃다발을 든 두 사람의 다정한 순간" className="cinematic-closeup" placeholderLabel="PHOTO 05" /></div>
      <p className="cinematic-script">a lifetime of little moments</p>
    </section>
  );
}

export function InvitationSection({ t }: { t: WeddingCopy }) {
  return (
    <section className="invitation-section section-pad">
      <span className="ornament-line" aria-hidden="true" />
      <p className="eyebrow">{t.invitationEyebrow}</p>
      <h2>{t.invitationTitle}</h2>
      <p className="preline">{t.invitationBody}</p>
      <span className="invitation-seal" aria-hidden="true">WITH LOVE</span>
    </section>
  );
}
