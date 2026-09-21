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
      <div className="venue-art" aria-hidden="true">
        <span className="venue-art-top">ONE DAY <i /> ONE PLACE</span>
        <span className="venue-art-initials">D <em>&amp;</em> T</span>
        <span className="venue-art-rule" />
        <span className="venue-art-bottom">THE CELEBRATION · {getDateDisplay(language).year}</span>
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
      {links.some(({ url }) => url) ? <div className="map-links">
        {links.filter(({ url }) => url).map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true">↗</span></a>
        ))}
      </div> : <p className="map-pending">{t.mapNote}</p>}
    </section>
  );
}
