import { discoveredImages } from "@/generated/images";

export type WeddingPhoto = { number: number; src: string; width: number; height: number };

/** 원하는 순서가 있으면 번호만 배열에 적으세요. 빈 배열이면 숫자 오름차순입니다. */
export const customImageOrder: number[] = [];

/** 표지 다음 네 장은 스토리에, 마지막 한 장은 엔딩에 사용합니다. */
export const storyPhotoCount = 4;
/** 사진이 아직 없을 때만 보여 줄 샘플 지면 수입니다. */
export const galleryMinimumTiles = 4;

/** 갤러리에서 한 장을 크게 보여 줄 사진 번호입니다. 원하는 번호를 추가하거나 빼세요. */
export const featuredGalleryNumbers = [8, 9, 11, 12];

/** 카카오톡과 링크 미리보기에 사용할 사진 번호입니다. 표지와 별도로 선택할 수 있습니다. */
export const shareImageNumber = 5;

export function getSharePhoto(): WeddingPhoto | undefined {
  const photos = [...discoveredImages] as WeddingPhoto[];
  return photos.find((photo) => photo.number === shareImageNumber) ?? photos[0];
}

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
