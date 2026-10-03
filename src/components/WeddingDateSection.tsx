"use client";

import { useEffect, useState } from "react";
import type { Language, WeddingCopy } from "@/lib/content";
import { getDateDisplay, getDayDifference } from "@/lib/date";
import { weddingConfig } from "@/lib/wedding-config";

export function WeddingDateSection({ t, language }: { t: WeddingCopy; language: Language }) {
  const date = getDateDisplay(language);
  const firstDay = new Date(Date.UTC(date.year, date.month - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(date.year, date.month, 0)).getUTCDate();
  const calendarCells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  const weekdays = language === "ko"
    ? ["일", "월", "화", "수", "목", "금", "토"]
    : ["日", "月", "火", "水", "木", "金", "土"];
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setDays(getDayDifference());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="date-section section-pad" id="date">
      <p className="section-number" aria-hidden="true">03</p>
      <p className="eyebrow">{t.dateEyebrow}</p>
      <h2>{t.dateTitle}</h2>
      <div className="calendar-card" aria-label={date.full}>
        <div className="calendar-heading">
          <span>{date.monthEnglish}</span>
          <strong>{String(date.month).padStart(2, "0")}</strong>
          <small>{date.year}</small>
        </div>
        <div className="calendar-grid calendar-weekdays">
          {weekdays.map((weekday) => <span key={weekday}>{weekday}</span>)}
        </div>
        <div className="calendar-grid calendar-days">
          {calendarCells.map((day, index) => (
            <span key={`${day ?? "blank"}-${index}`} className={day === date.day ? "wedding-date" : ""}>
              {day}
              {day === date.day && <i aria-hidden="true" />}
            </span>
          ))}
        </div>
      </div>
      <div className="date-summary">
        <p>{date.full}</p>
        <strong>{weddingConfig.venue[language]}</strong>
        <span>{weddingConfig.venue[language === "ko" ? "hallKo" : "hallJa"]}</span>
      </div>
      <div className="date-count-wrap">
        <span>{t.dateFoot}</span>
        <strong className="date-count" aria-live="polite">
          {days === null ? "\u00a0" : days === 0 ? t.weddingDay : `${days > 0 ? t.countBefore : t.countAfter}${Math.abs(days)}`}
        </strong>
      </div>
    </section>
  );
}
