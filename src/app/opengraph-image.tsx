import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getSharePhoto } from "@/lib/image-config";
import { weddingConfig } from "@/lib/wedding-config";
import { getDateDisplay } from "@/lib/date";

export const alt = "정동균과 야마다 츠키나의 웨딩 초대장";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = getSharePhoto();
  const [scriptFont, basicFont, image] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/PinyonScript-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Basic-Regular.ttf")),
    photo
      ? sharp(join(process.cwd(), "public", photo.src.slice(1)))
          .resize(710, 630, { fit: "cover", position: "north" })
          .jpeg({ quality: 82 })
          .toBuffer()
      : Promise.resolve(null),
  ]);
  const photoUrl = image ? `data:image/jpeg;base64,${image.toString("base64")}` : undefined;
  const date = getDateDisplay("ko");

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f9f3ed", color: "#3b3130", fontFamily: "Basic" }}>
      <div style={{ display: "flex", width: 710, height: 630, position: "relative", overflow: "hidden", background: "#ead7d4" }}>
        {photoUrl && <img src={photoUrl} alt="" width={710} height={630} style={{ objectFit: "cover" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 63%, rgba(39,29,31,.42) 100%)" }} />
        <div style={{ position: "absolute", left: 46, bottom: 37, display: "flex", fontSize: 14, color: "#ffffff", letterSpacing: 4 }}>
          AN INVITATION TO OUR STORY
        </div>
      </div>
      <div style={{ display: "flex", width: 490, height: 630, flexDirection: "column", padding: "50px 51px 42px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 15, letterSpacing: 5, color: "#987875" }}>
          <span>THE WEDDING OF</span><span>06 · 12 · 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Pinyon", fontSize: 86, lineHeight: 1.05, color: "#a77b83", marginLeft: -5 }}>Our forever</div>
          <div style={{ display: "flex", width: 58, height: 1, background: "#bd9b99", marginTop: 23, marginBottom: 28 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 25, lineHeight: 1.55, letterSpacing: 1.5 }}>
            <span>{weddingConfig.groom.en}</span>
            <span style={{ fontFamily: "Pinyon", fontSize: 38, lineHeight: 0.8, color: "#a77b83" }}>&amp;</span>
            <span>{weddingConfig.bride.en}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 16, letterSpacing: 2, color: "#705c59" }}>
          <span>{String(date.day).padStart(2, "0")}  ·  {date.monthEnglish.toUpperCase()}  ·  {date.year}</span>
          <span style={{ fontSize: 13, letterSpacing: 2.2 }}>{weddingConfig.venue.ko}</span>
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Basic", data: basicFont, style: "normal", weight: 400 }, { name: "Pinyon", data: scriptFont, style: "normal", weight: 400 }] },
  );
}
