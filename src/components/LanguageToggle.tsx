import type { Language } from "@/lib/content";

export function LanguageToggle({ language, onChange }: { language: Language; onChange: (next: Language) => void }) {
  return (
    <div className="language-toggle" role="group" aria-label="Language / 언어 / 言語">
      <button type="button" className={language === "ko" ? "active" : ""} aria-pressed={language === "ko"} onClick={() => onChange("ko")}>KR</button>
      <span aria-hidden="true" />
      <button type="button" className={language === "ja" ? "active" : ""} aria-pressed={language === "ja"} onClick={() => onChange("ja")}>JP</button>
    </div>
  );
}
