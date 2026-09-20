import { discoveredImages } from "@/generated/images";

export type WeddingPhoto = { number: number; src: string; width: number; height: number };

/** 원하는 순서가 있으면 번호만 배열에 적으세요. 빈 배열이면 숫자 오름차순입니다. */
export const customImageOrder: number[] = [];

/** 표지 다음 네 장은 스토리에, 마지막 한 장은 엔딩에 사용합니다. */
export const storyPhotoCount = 4;
export const galleryMinimumTiles = 10;

export function getImagePlan() {
  const all = [...discoveredImages] as WeddingPhoto[];
  if (customImageOrder.length) {
    all.sort((a, b) => {
      const ai = customImageOrder.indexOf(a.number);
      const bi = customImageOrder.indexOf(b.number);
      return (ai < 0 ? Number.MAX_SAFE_INTEGER : ai) - (bi < 0 ? Number.MAX_SAFE_INTEGER : bi) || a.number - b.number;
    });
  }
  const hero = all[0];
  const story = all.slice(1, 1 + storyPhotoCount);
  const ending = all.length > storyPhotoCount + 2 ? all.at(-1) : undefined;
  const gallery = all.slice(1 + storyPhotoCount, ending ? -1 : undefined);
  return { hero, story, gallery, ending };
}
