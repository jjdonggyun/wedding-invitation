import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // 크롤러가 페이지의 noindex 메타 태그와 X-Robots-Tag를 읽을 수 있어야 합니다.
  return { rules: { userAgent: "*", allow: "/" } };
}
