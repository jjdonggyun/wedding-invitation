"use client";

import Image from "next/image";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

type KakaoMapsApi = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => unknown;
  Map: new (container: HTMLElement, options: { center: unknown; level: number; draggable: boolean; scrollwheel: boolean }) => unknown;
  Marker: new (options: { position: unknown }) => { setMap: (map: unknown) => void };
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMapsApi };
  }
}

export function VenueMap({ language }: { language: Language }) {
  const [activeTab, setActiveTab] = useState<"map" | "guide">("map");
  const [mapReady, setMapReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const mapElementRef = useRef<HTMLDivElement>(null);
  const initializedElementRef = useRef<HTMLDivElement | null>(null);
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY;
  const labels = language === "ko"
    ? { map: "지도", guide: "약도", mapTitle: "스탠포드호텔서울 위치 지도", guideAlt: "스탠포드호텔서울 약도와 교통 안내", loading: "카카오맵을 불러오는 중입니다.", failed: "지도를 불러오지 못했습니다.", open: "카카오맵에서 위치 보기" }
    : { map: "地図", guide: "略図", mapTitle: "スタンフォードホテルソウルの位置地図", guideAlt: "スタンフォードホテルソウルの略図と交通案内", loading: "カカオマップを読み込んでいます。", failed: "地図を読み込めませんでした。", open: "カカオマップで位置を見る" };

  const initializeMap = useCallback(() => {
    const mapElement = mapElementRef.current;
    const maps = window.kakao?.maps;
    if (!mapElement || !maps || initializedElementRef.current === mapElement) return;

    maps.load(() => {
      if (!mapElementRef.current || mapElementRef.current !== mapElement) return;
      const position = new maps.LatLng(weddingConfig.venue.location.latitude, weddingConfig.venue.location.longitude);
      const map = new maps.Map(mapElement, { center: position, level: 3, draggable: true, scrollwheel: false });
      const marker = new maps.Marker({ position });
      marker.setMap(map);
      initializedElementRef.current = mapElement;
      setMapFailed(false);
      setMapReady(true);
    });
  }, []);

  useEffect(() => {
    if (activeTab !== "map") return;
    setMapReady(false);
    initializeMap();
  }, [activeTab, initializeMap]);

  useEffect(() => {
    if (activeTab !== "map" || !kakaoKey || mapReady) return;
    const timeout = window.setTimeout(() => setMapFailed(true), 8000);
    return () => window.clearTimeout(timeout);
  }, [activeTab, kakaoKey, mapReady]);

  return (
    <div className="venue-map-shell">
      {kakaoKey && (
        <Script
          id="kakao-maps-sdk"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`}
          strategy="lazyOnload"
          onReady={initializeMap}
          onError={() => setMapFailed(true)}
        />
      )}
      <div className="venue-map-tabs" role="tablist" aria-label={language === "ko" ? "지도 보기 방식" : "地図の表示方法"}>
        <button type="button" role="tab" aria-selected={activeTab === "map"} onClick={() => setActiveTab("map")}>{labels.map}</button>
        <button type="button" role="tab" aria-selected={activeTab === "guide"} onClick={() => setActiveTab("guide")}>{labels.guide}</button>
      </div>
      <div className="venue-map-panel" role="tabpanel">
        {activeTab === "map" ? (
          <div className="venue-live-map">
            <div ref={mapElementRef} className="venue-kakao-map" role="img" aria-label={labels.mapTitle} />
            {!mapReady && (
              <div className="venue-map-loading" role="status">
                <span>{!kakaoKey || mapFailed ? labels.failed : labels.loading}</span>
                {(!kakaoKey || mapFailed) && <a href={weddingConfig.mapLinks.kakao} target="_blank" rel="noopener noreferrer">{labels.open}</a>}
              </div>
            )}
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
