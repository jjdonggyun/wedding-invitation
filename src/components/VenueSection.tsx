import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";
import { VenueMap } from "./VenueMap";

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
      <div className="venue-details">
        <span className="venue-small">STANFORD HOTEL SEOUL</span>
        <h3>{weddingConfig.venue[language]}</h3>
        <strong>{weddingConfig.venue[language === "ko" ? "hallKo" : "hallJa"]}</strong>
        <p>{weddingConfig.venue[language === "ko" ? "addressKo" : "addressJa"]}</p>
        <a className="venue-phone" href={`tel:${weddingConfig.venue.phone}`}>{weddingConfig.venue.phone}</a>
      </div>
      <VenueMap language={language} />
      {links.some(({ url }) => url) ? <div className="map-links">
        {links.filter(({ url }) => url).map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer"><span>{label}</span><i aria-hidden="true">↗</i></a>
        ))}
      </div> : <p className="map-pending">{t.mapNote}</p>}
      <div className="venue-access">
        <div><span>{language === "ko" ? "지하철" : "地下鉄"}</span><p>{language === "ko" ? "디지털미디어시티역에서 도보 약 10–15분" : "デジタルメディアシティ駅から徒歩約10〜15分"}</p></div>
        <div><span>{language === "ko" ? "예식" : "挙式"}</span><p>{getDateDisplay(language).full}<br />{weddingConfig.venue[language === "ko" ? "hallKo" : "hallJa"]}</p></div>
      </div>
    </section>
  );
}
