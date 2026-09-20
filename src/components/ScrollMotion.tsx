"use client";

import { useEffect } from "react";

const targets = [
  ".intro-section .section-kicker", ".intro-title", ".intro-body", ".editorial-photo-wrap",
  ".serif-quote", ".quote-caption", ".couple-photo", ".couple-names",
  ".date-section .eyebrow", ".date-section h2", ".date-display", ".date-weekday", ".date-venue", ".date-count",
  ".film-stage-overline", ".cinematic-landscape", ".cinematic-caption", ".closeup-wrap", ".cinematic-script",
  ".invitation-section .eyebrow", ".invitation-section h2", ".invitation-section > p:last-of-type", ".invitation-seal",
  ".gallery-section .eyebrow", ".gallery-section h2", ".gallery-description", ".gallery-tile",
  ".venue-section .eyebrow", ".venue-section h2", ".venue-map", ".venue-details",
  ".contact-section h2", ".contact-groups", ".account-section h2", ".account-list",
  ".share-section h2", ".share-actions", ".ending-photo-wrap", ".ending-content",
].join(",");

export function ScrollMotion() {
  useEffect(() => {
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector(".wedding-book");
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(targets));
    items.forEach((item) => item.setAttribute("data-reveal", ""));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0 });
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.93 && rect.bottom > 0) item.classList.add("is-visible");
      else observer.observe(item);
    });
    root.classList.add("motion-ready");
    return () => { observer.disconnect(); root.classList.remove("motion-ready"); };
  }, []);
  return null;
}
