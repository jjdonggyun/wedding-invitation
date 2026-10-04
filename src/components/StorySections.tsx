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
        <PhotoFrame photo={photo} alt={t.introPhotoAlt} className="editorial-photo" placeholderLabel="PHOTO 02" />
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
      <PhotoFrame photo={photo} alt={t.couplePhotoAlt} className="couple-photo" placeholderLabel="PHOTO 03" />
      <div className="couple-names">
        <div><span className="small-label">{t.groom}</span><strong>{weddingConfig.groom[language]}</strong><small>{weddingConfig.groom.en}</small></div>
        <span className="couple-amp">&amp;</span>
        <div><span className="small-label">{t.bride}</span><strong>{weddingConfig.bride[language]}</strong><small>{weddingConfig.bride.en}</small></div>
      </div>
      <div className="family-lines section-pad">
        <p><span>{weddingConfig.family.groomParents[language]}</span><small>{language === "ko" ? `의 ${weddingConfig.family.groomRelation.ko}` : `の${weddingConfig.family.groomRelation.ja}`}</small><strong>{language === "ko" ? "동균" : "ドンギュン"}</strong></p>
        <p><span>{weddingConfig.family.brideParents[language]}</span><small>{language === "ko" ? `의 ${weddingConfig.family.brideRelation.ko}` : `の${weddingConfig.family.brideRelation.ja}`}</small><strong>{language === "ko" ? "츠키나" : "ツキナ"}</strong></p>
      </div>
    </section>
  );
}

export function CinematicPhotos({ t, photos }: { t: WeddingCopy; photos: WeddingPhoto[] }) {
  const [lead, ...closeups] = photos;
  if (!lead) return null;
  return (
    <section className="cinematic-section" aria-label={t.together}>
      <div className="film-stage">
        <p className="film-stage-overline">OUR MOMENTS <span>—</span> 2026</p>
        <PhotoFrame photo={lead} alt={t.cinematicPhotoAlt} className="cinematic-landscape" />
        <div className="cinematic-caption"><span>{t.together}</span></div>
      </div>
      {closeups.map((photo) => <div className="closeup-wrap" key={photo.id}><PhotoFrame photo={photo} alt={t.cinematicCloseupAlt} className="cinematic-closeup" /></div>)}
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
