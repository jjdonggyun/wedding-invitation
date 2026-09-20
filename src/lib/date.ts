import { weddingConfig } from "./wedding-config";
import type { Language } from "./content";

const zone = "Asia/Seoul";
const wedding = new Date(weddingConfig.weddingDate);

export function getDateDisplay(lang: Language) {
  const [year, month, day] = weddingConfig.weddingDate.slice(0, 10).split("-").map(Number);
  const weekday = new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "ja-JP", {
    weekday: "long",
    timeZone: zone,
  }).format(wedding);
  const timeParts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: zone,
  }).formatToParts(wedding);
  const hour24 = Number(timeParts.find((part) => part.type === "hour")?.value ?? 13);
  const minute = Number(timeParts.find((part) => part.type === "minute")?.value ?? 0);
  const hour12 = hour24 % 12 || 12;
  const time = lang === "ko"
    ? `${hour24 < 12 ? "오전" : "오후"} ${hour12}시${minute ? ` ${minute}분` : ""}`
    : `${hour24 < 12 ? "午前" : "午後"}${hour12}時${minute ? `${minute}分` : ""}`;
  const full = lang === "ko"
    ? `${year}년 ${month}월 ${day}일 ${weekday} · ${time}`
    : `${year}年${month}月${day}日（${weekday.replace("曜日", "")}） · ${time}`;
  return {
    year, month, day, weekday, time, full,
    numeric: `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`,
    monthEnglish: new Intl.DateTimeFormat("en-US", { month: "long", timeZone: zone }).format(wedding),
  };
}

export function getDayDifference(now = new Date()) {
  const currentKoreanDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const [cy, cm, cd] = currentKoreanDate.split("-").map(Number);
  const [wy, wm, wd] = weddingConfig.weddingDate.slice(0, 10).split("-").map(Number);
  return Math.round((Date.UTC(wy, wm - 1, wd) - Date.UTC(cy, cm - 1, cd)) / 86_400_000);
}
