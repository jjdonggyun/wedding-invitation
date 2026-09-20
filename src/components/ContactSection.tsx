import type { Language, WeddingCopy } from "@/lib/content";
import { weddingConfig } from "@/lib/wedding-config";

export function ContactSection({ t, language }: { t: WeddingCopy; language: Language }) {
  const groups = [
    { side: t.groom, name: weddingConfig.groom[language], phone: weddingConfig.contacts.groom, parents: [{ label: t.father, phone: weddingConfig.contacts.groomFather }, { label: t.mother, phone: weddingConfig.contacts.groomMother }] },
    { side: t.bride, name: weddingConfig.bride[language], phone: weddingConfig.contacts.bride, parents: [{ label: t.father, phone: weddingConfig.contacts.brideFather }, { label: t.mother, phone: weddingConfig.contacts.brideMother }] },
  ];
  const hasAnyContact = groups.some((group) => group.phone || group.parents.some((parent) => parent.phone));
  return (
    <section className="contact-section section-pad" id="contact">
      <p className="eyebrow">{t.contactEyebrow}</p>
      <h2>{t.contactTitle}</h2>
      <div className="contact-groups">
        {groups.map((group) => (
          <div className="contact-group" key={group.side}>
            <div className="contact-person"><span>{group.side}</span><strong>{group.name}</strong>{group.phone && <a href={`tel:${group.phone}`} aria-label={`${group.name} ${t.call}`}>↗</a>}</div>
            {group.parents.filter((parent) => parent.phone).map((parent) => <div className="contact-parent" key={parent.label}><span>{parent.label}</span><a href={`tel:${parent.phone}`} aria-label={`${parent.label} ${t.call}`}>{t.call} ↗</a></div>)}
          </div>
        ))}
      </div>
      {!hasAnyContact && <p className="quiet-note">{t.contactNote}</p>}
    </section>
  );
}
