import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";

export function VenueSection({ t, language }: { t: WeddingCopy; language: Language }) {
  const links = [
    { label: t.mapKakao, url: weddingConfig.mapLinks.kakao },
    { label: t.mapNaver, url: weddingConfig.mapLinks.naver },
    { label: t.mapTmap, url: weddingConfig.mapLinks.tmap },
  ];
  return (
    <section className="venue-section section-pad" id="venue">
      <p className="eyebrow">{t.venueEyebrow}</p>
      <h2>{t.venueTitle}</h2>
      <div className="venue-map" aria-hidden="true">
        <div className="map-track map-track-one" /><div className="map-track map-track-two" /><div className="map-track map-track-three" />
        <div className="map-ring"><div><span>✳</span></div></div>
        <span className="map-coord">37° N / 126° E</span>
        <span className="map-word">THE PLACE<br />WE SAY YES</span>
      </div>
      <div className="venue-details">
        <span className="venue-small">LOCATION</span>
        <h3>{weddingConfig.venue[language]}</h3>
        <p>{weddingConfig.venue[language === "ko" ? "addressKo" : "addressJa"]}</p>
        <div className="venue-detail-line" />
        <span className="venue-small">DATE &amp; TIME</span>
        <p className="venue-datetime">{getDateDisplay(language).full}</p>
      </div>
      <p className="venue-note">{t.venueNote}</p>
      <div className="map-links">
        {links.map(({ label, url }) => url ? (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true">↗</span></a>
        ) : <span className="map-link-disabled" key={label}>{label}<span aria-hidden="true">↗</span></span>)}
      </div>
      {links.every(({ url }) => !url) && <p className="map-pending">{t.mapNote}</p>}
    </section>
  );
}
