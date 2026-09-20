"use client";

import { useEffect, useState } from "react";
import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay, getDayDifference } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";

export function WeddingDateSection({ t, language }: { t: WeddingCopy; language: Language }) {
  const date = getDateDisplay(language);
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setDays(getDayDifference());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="date-section section-pad" id="date">
      <p className="eyebrow">{t.dateEyebrow}</p>
      <h2>{t.dateTitle}</h2>
      <div className="date-display" aria-label={date.full}>
        <div className="date-number">{String(date.day).padStart(2, "0")}</div>
        <div className="date-side"><span>{date.monthEnglish}</span><i /><span>{date.year}</span></div>
      </div>
      <p className="date-weekday">{date.weekday.toUpperCase()} <span>·</span> {date.time}</p>
      <div className="date-divider"><span aria-hidden="true">✳</span></div>
      <p className="date-venue">{weddingConfig.venue[language]}</p>
      <p className="date-count" aria-live="polite">
        {days === null ? "\u00a0" : days === 0 ? t.weddingDay : `${days > 0 ? t.countBefore : t.countAfter} ${Math.abs(days)}`}
      </p>
      <p className="date-foot">{t.dateFoot}</p>
    </section>
  );
}
