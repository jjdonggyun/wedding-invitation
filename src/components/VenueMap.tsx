"use client";

import Image from "next/image";
import { useState } from "react";
import type { Language } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

export function VenueMap({ language }: { language: Language }) {
  const [activeTab, setActiveTab] = useState<"map" | "guide">("map");
  const labels = language === "ko"
    ? { map: "지도", guide: "약도", mapTitle: "스탠포드호텔서울 위치 지도", guideAlt: "스탠포드호텔서울 약도와 교통 안내" }
    : { map: "地図", guide: "略図", mapTitle: "スタンフォードホテルソウルの位置地図", guideAlt: "スタンフォードホテルソウルの略図と交通案内" };
  const embeddedMapUrl = `https://www.google.com/maps?q=${weddingConfig.venue.location.latitude},${weddingConfig.venue.location.longitude}&z=16&output=embed&hl=${language === "ko" ? "ko" : "ja"}`;

  return (
    <div className="venue-map-shell">
      <div className="venue-map-tabs" role="tablist" aria-label={language === "ko" ? "지도 보기 방식" : "地図の表示方法"}>
        <button type="button" role="tab" aria-selected={activeTab === "map"} onClick={() => setActiveTab("map")}>{labels.map}</button>
        <button type="button" role="tab" aria-selected={activeTab === "guide"} onClick={() => setActiveTab("guide")}>{labels.guide}</button>
      </div>
      <div className="venue-map-panel" role="tabpanel">
        {activeTab === "map" ? (
          <div className="venue-live-map">
            <iframe className="venue-embed-map" src={embeddedMapUrl} title={labels.mapTitle} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <div className="venue-map-badge">
              <strong>STANFORD HOTEL</strong>
              <span>SEOUL · SANGAM</span>
            </div>
            <a className="venue-map-open" href={weddingConfig.mapLinks.kakao} target="_blank" rel="noopener noreferrer">
              {language === "ko" ? "크게 보기" : "大きく見る"}<span aria-hidden="true">↗</span>
            </a>
          </div>
        ) : (
          <div className="venue-guide-map">
            <Image src="/venue-guide.png" alt={labels.guideAlt} fill sizes="(max-width: 480px) 92vw, 420px" />
          </div>
        )}
      </div>
    </div>
  );
}
