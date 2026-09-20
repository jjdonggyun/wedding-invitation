"use client";

import { useState } from "react";
import type { Language, WeddingCopy } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";
import { getDateDisplay } from "@/lib/date";

type KakaoWindow = Window & { Kakao?: { isInitialized: () => boolean; init: (key: string) => void; Share: { sendDefault: (options: unknown) => void } } };

export function ShareSection({ t, language, heroImage }: { t: WeddingCopy; language: Language; heroImage?: string }) {
  const [notice, setNotice] = useState("");
  function showNotice(message: string) { setNotice(message); window.setTimeout(() => setNotice(""), 3500); }

  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); showNotice(t.copied); }
    catch { showNotice(t.copyFailed); }
  }

  function shareKakao() {
    const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    const kakao = (window as KakaoWindow).Kakao;
    if (!key || !kakao || !heroImage) { showNotice(t.kakaoPending); return; }
    if (!kakao.isInitialized()) kakao.init(key);
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${weddingConfig.groom[language]} & ${weddingConfig.bride[language]}`,
        description: `${getDateDisplay(language).numeric} · ${weddingConfig.venue[language]}`,
        imageUrl: new URL(heroImage, window.location.origin).href,
        link: { mobileWebUrl: window.location.href, webUrl: window.location.href },
      },
      buttons: [{ title: language === "ko" ? "청첩장 보기" : "招待状を見る", link: { mobileWebUrl: window.location.href, webUrl: window.location.href } }],
    });
  }

  return (
    <section className="share-section section-pad">
      <p className="eyebrow">{t.shareEyebrow}</p>
      <h2>{t.shareTitle}</h2>
      <p>{t.shareBody}</p>
      <div className="share-actions"><button type="button" onClick={copyLink}>{t.copyLink}<span aria-hidden="true">↗</span></button><button type="button" onClick={shareKakao}>{t.kakaoShare}<span aria-hidden="true">↗</span></button></div>
      <p className="share-notice" role="status">{notice || "\u00a0"}</p>
    </section>
  );
}
