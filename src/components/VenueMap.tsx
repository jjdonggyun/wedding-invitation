"use client";

import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

type KakaoMap = {
  setCenter: (position: unknown) => void;
  setZoomable: (zoomable: boolean) => void;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => unknown;
  Map: new (container: HTMLElement, options: { center: unknown; level: number }) => KakaoMap;
  Marker: new (options: { map: KakaoMap; position: unknown }) => unknown;
  services: {
    Status: { OK: string };
    Geocoder: new () => {
      addressSearch: (address: string, callback: (results: Array<{ x: string; y: string }>, status: string) => void) => void;
    };
  };
};

declare global {
  interface Window {
    kakao?: { maps?: KakaoMaps };
  }
}

export function VenueMap({ language }: { language: Language }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
  const address = weddingConfig.venue.addressKo;

  useEffect(() => {
    const container = containerRef.current;
    if (!key || !container) { setState("error"); return; }

    const renderMap = () => {
      const maps = window.kakao?.maps;
      if (!maps || !containerRef.current) { setState("error"); return; }
      maps.load(() => {
        if (!containerRef.current) return;
        const fallback = new maps.LatLng(37.5797, 126.8897);
        const map = new maps.Map(containerRef.current, { center: fallback, level: 4 });
        map.setZoomable(false);
        const geocoder = new maps.services.Geocoder();
        geocoder.addressSearch(address, (results, status) => {
          if (status !== maps.services.Status.OK || !results[0]) { setState("error"); return; }
          const position = new maps.LatLng(Number(results[0].y), Number(results[0].x));
          new maps.Marker({ map, position });
          map.setCenter(position);
          setState("ready");
        });
      });
    };

    if (window.kakao?.maps) { renderMap(); return; }
    const id = "kakao-map-sdk";
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", renderMap, { once: true });
      existing.addEventListener("error", () => setState("error"), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.addEventListener("load", renderMap, { once: true });
    script.addEventListener("error", () => setState("error"), { once: true });
    document.head.appendChild(script);
  }, [address, key]);

  return (
    <div className="venue-map-shell">
      <div ref={containerRef} className="venue-map-canvas" aria-label={language === "ko" ? "스탠포드호텔 코리아 지도" : "スタンフォードホテルコリアの地図"} />
      {state !== "ready" && (
        <div className="venue-map-fallback">
          <span>{state === "loading" ? "MAP LOADING" : "LOCATION"}</span>
          <strong>{weddingConfig.venue[language]}</strong>
          <small>{weddingConfig.venue[language === "ko" ? "addressKo" : "addressJa"]}</small>
        </div>
      )}
      <a className="venue-map-open" href={weddingConfig.mapLinks.kakao} target="_blank" rel="noopener noreferrer">
        {language === "ko" ? "카카오맵에서 보기" : "Kakao Mapで見る"}<span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
