"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { WeddingPhoto } from "@/lib/image-config";
import { galleryMinimumTiles } from "@/lib/image-config";
import type { WeddingCopy } from "@/lib/content";
import { PhotoFrame } from "./PhotoFrame";

export function GallerySection({ photos, t }: { photos: WeddingPhoto[]; t: WeddingCopy }) {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? 0 : (current + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? 0 : (current - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); };
  }, [active, photos.length]);

  const count = Math.max(galleryMinimumTiles, photos.length);
  const slots = Array.from({ length: count }, (_, index) => photos[index]);

  return (
    <section className="gallery-section section-pad" id="gallery">
      <p className="eyebrow">{t.galleryEyebrow}</p>
      <h2>{t.galleryTitle}<em>.</em></h2>
      <p className="gallery-description">{t.galleryDesc}</p>
      <div className="gallery-grid">
        {slots.map((photo, index) => {
          const label = `${t.photo} ${String(index + 1).padStart(2, "0")}`;
          const landscape = !!photo && photo.width / photo.height > 1.18;
          const featured = landscape || index % 6 === 2;
          return photo ? (
            <button type="button" className={`gallery-tile gallery-tile-${index % 6}${landscape ? " gallery-tile-wide" : ""}`} key={photo.src} aria-label={`${label} ${t.enlarge}`} onClick={() => setActive(index)}>
              <PhotoFrame photo={photo} alt={label} sizes={featured ? "(max-width: 480px) 90vw, 430px" : "(max-width: 480px) 45vw, 220px"} ratio={landscape ? Math.min(photo.width / photo.height, 1.85) : undefined} />
              <span className="gallery-tile-number">{String(index + 1).padStart(2, "0")}</span>
            </button>
          ) : (
            <div className={`gallery-tile gallery-tile-${index % 6}`} key={`placeholder-${index}`}>
              <PhotoFrame alt={label} placeholderLabel={label} />
              <span className="gallery-tile-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
          );
        })}
      </div>
      <p className="gallery-endmark" aria-hidden="true">✳</p>
      {active !== null && photos[active] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Wedding gallery" onClick={() => setActive(null)}>
          <button type="button" className="lightbox-close" aria-label={t.close} onClick={() => setActive(null)}>×</button>
          <div className="lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image src={photos[active].src} alt={`${t.photo} ${active + 1}`} fill sizes="100vw" style={{ objectFit: "contain" }} quality={90} />
          </div>
          <div className="lightbox-controls" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label={t.previous} onClick={() => setActive((active - 1 + photos.length) % photos.length)}>←</button>
            <span>{String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
            <button type="button" aria-label={t.next} onClick={() => setActive((active + 1) % photos.length)}>→</button>
          </div>
        </div>
      )}
    </section>
  );
}
