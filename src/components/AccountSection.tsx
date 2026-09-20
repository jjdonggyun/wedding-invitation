"use client";

import { useState } from "react";
import type { WeddingCopy } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

export function AccountSection({ t }: { t: WeddingCopy }) {
  const [open, setOpen] = useState<"groom" | "bride" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const sides = [
    { key: "groom" as const, label: t.groomSide, account: weddingConfig.accounts.groom },
    { key: "bride" as const, label: t.brideSide, account: weddingConfig.accounts.bride },
  ];
  async function copyAccount(number: string) {
    try { await navigator.clipboard.writeText(number); setCopied(number); window.setTimeout(() => setCopied(null), 2500); }
    catch { setCopied(null); }
  }
  return (
    <section className="account-section section-pad" id="account">
      <p className="eyebrow">{t.accountEyebrow}</p>
      <h2>{t.accountTitle}</h2>
      <p className="account-intro">{t.accountNote}</p>
      <div className="account-list">
        {sides.map(({ key, label, account }) => {
          const expanded = open === key;
          return <div className="account-item" key={key}>
            <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : key)}><span>{label}</span><span className={`account-plus ${expanded ? "rotated" : ""}`}>+</span></button>
            {expanded && <div className="account-content">{account.number && account.bank && account.holder ? <><p>{account.bank} · {account.holder}</p><strong>{account.number}</strong><button type="button" className="text-action" onClick={() => copyAccount(account.number)}>{copied === account.number ? t.copied : t.copyAccount} ↗</button></> : <p>{t.accountPending}</p>}</div>}
          </div>;
        })}
      </div>
    </section>
  );
}
