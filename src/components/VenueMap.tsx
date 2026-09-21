import type { Language } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

export function VenueMap({ language }: { language: Language }) {
  const { latitude, longitude } = weddingConfig.venue.location;
  const longitudeMargin = 0.0052;
  const latitudeMargin = 0.0035;
  const bbox = [
    longitude - longitudeMargin,
    latitude - latitudeMargin,
    longitude + longitudeMargin,
    latitude + latitudeMargin,
  ].join(",");
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const mapTitle = language === "ko"
    ? "스탠포드호텔 코리아 위치 지도"
    : "スタンフォードホテルコリアの位置地図";

  return (
    <div className="venue-map-shell">
      <iframe
        className="venue-map-frame"
        src={mapUrl}
        title={mapTitle}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
      <div className="venue-map-wash" aria-hidden="true" />
      <div className="venue-map-label" aria-hidden="true">
        <span>STANFORD HOTEL</span>
        <small>SEOUL · SANGAM</small>
      </div>
      <a
        className="venue-map-credit"
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
      >
        © OpenStreetMap
      </a>
      <a className="venue-map-open" href={weddingConfig.mapLinks.kakao} target="_blank" rel="noopener noreferrer">
        {language === "ko" ? "카카오맵에서 보기" : "Kakao Mapで見る"}<span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
