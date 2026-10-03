"use client";

import { useState } from "react";
import type { Language, WeddingCopy } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";
import { getDateDisplay } from "@/lib/date";

type KakaoWindow = Window & { Kakao?: { isInitialized: () => boolean; init: (key: string) => void; Share: { sendDefault: (options: unknown) => void } } };

export function ShareSection({ t, language }: { t: WeddingCopy; language: Language }) {
  const [notice, setNotice] = useState("");
  function showNotice(message: string) { setNotice(message); window.setTimeout(() => setNotice(""), 3500); }

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); showNotice(t.copied); }
    catch { showNotice(t.copyFailed); }
  }

  async function shareKakao() {
    const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    const kakao = (window as KakaoWindow).Kakao;
    const url = new URL("/", window.location.origin).href;
    const title = `${weddingConfig.groom[language]} ♥ ${weddingConfig.bride[language]}`;
    const description = `${getDateDisplay(language).full} · ${weddingConfig.venue[language]}`;
    if (key && kakao) {
      try {
        if (!kakao.isInitialized()) kakao.init(key);
        kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title,
            description,
            imageUrl: new URL("/opengraph-image", url).href,
            imageWidth: 1200,
            imageHeight: 630,
            link: { mobileWebUrl: url, webUrl: url },
          },
          buttons: [
            { title: language === "ko" ? "모바일 청첩장" : "招待状を見る", link: { mobileWebUrl: url, webUrl: url } },
            { title: language === "ko" ? "위치 보기" : "会場を見る", link: { mobileWebUrl: `${url}#venue`, webUrl: `${url}#venue` } },
          ],
        });
        return;
      } catch { /* SDK를 사용할 수 없을 때 기기 공유 메뉴로 이어집니다. */ }
    }
    if (navigator.share) {
      try { await navigator.share({ title, text: description, url }); return; }
      catch (error) { if (error instanceof DOMException && error.name === "AbortError") return; }
    }
    try { await navigator.clipboard.writeText(url); showNotice(t.copied); }
    catch { showNotice(t.kakaoPending); }
  }

  function shareLine() {
    const url = new URL("/", window.location.origin).href;
    const title = `${weddingConfig.groom[language]} ♥ ${weddingConfig.bride[language]}`;
    const description = `${getDateDisplay(language).full} · ${weddingConfig.venue[language]}`;
    const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}\n${description}`)}`;
    window.open(lineShareUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="share-section section-pad">
      <p className="eyebrow">{t.shareEyebrow}</p>
      <h2>{t.shareTitle}</h2>
      <p>{t.shareBody}</p>
      <div className="share-actions">
        <button type="button" onClick={copyLink}>{t.copyLink}<span aria-hidden="true">↗</span></button>
        <button type="button" className="share-kakao" onClick={shareKakao}>{t.kakaoShare}<span aria-hidden="true">↗</span></button>
        <button type="button" className="share-line" onClick={shareLine}>{t.lineShare}<span aria-hidden="true">↗</span></button>
      </div>
      <p className="share-notice" role="status">{notice || "\u00a0"}</p>
    </section>
  );
}
