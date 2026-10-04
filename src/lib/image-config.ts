import { discoveredImages } from "@/generated/images";

export type WeddingPhoto = {
  id: string;
  role: "hero" | "story" | "gallery" | "ending" | "share";
  order: number;
  featured: boolean;
  src: string;
  width: number;
  height: number;
};

/** 사진이 아직 없을 때만 보여 줄 샘플 지면 수입니다. */
export const galleryMinimumTiles = 4;

const photos = discoveredImages as readonly WeddingPhoto[];

/** share.jpg를 우선 사용하고, 없으면 hero.jpg를 공유 미리보기로 사용합니다. */
export function getSharePhoto(): WeddingPhoto | undefined {
  return photos.find((photo) => photo.role === "share") ?? photos.find((photo) => photo.role === "hero");
}

export function getImagePlan() {
  const hero = photos.find((photo) => photo.role === "hero");
  const story = {
    intro: photos.find((photo) => photo.id === "story-intro"),
    couple: photos.find((photo) => photo.id === "story-couple"),
    cinematic: photos.filter((photo) => photo.id.startsWith("story-cinematic-")).sort((a, b) => a.order - b.order),
  };
  const gallery = photos.filter((photo) => photo.role === "gallery").sort((a, b) => a.order - b.order);
  const ending = photos.find((photo) => photo.role === "ending");
  return { hero, story, gallery, ending };
}
