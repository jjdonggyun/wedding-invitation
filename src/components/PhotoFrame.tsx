import Image from "next/image";
import type { WeddingPhoto } from "@/lib/image-config";

type Props = {
  photo?: WeddingPhoto;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  placeholderLabel?: string;
  ratio?: number;
};

export function PhotoFrame({ photo, alt, className = "", sizes = "(max-width: 480px) 100vw, 480px", priority = false, position, placeholderLabel, ratio }: Props) {
  return (
    <div className={`photo-frame ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {photo ? (
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          quality={85}
          style={{ objectPosition: position ?? "center center" }}
        />
      ) : (
        <div className="photo-placeholder" aria-label={placeholderLabel ?? alt}>
          <span className="placeholder-flower">✳</span>
          <span className="placeholder-line" />
          <span>{placeholderLabel ?? "A MOMENT TO COME"}</span>
          <span className="placeholder-line" />
        </div>
      )}
    </div>
  );
}
