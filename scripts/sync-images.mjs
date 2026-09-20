import { readdir, mkdir, copyFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "images");
const destination = path.join(root, "public", "images");
const generated = path.join(root, "src", "generated", "images.ts");
const pattern = /^(\d+)\.(jpe?g|png|webp|avif)$/i;

await mkdir(source, { recursive: true });
await mkdir(destination, { recursive: true });
await mkdir(path.dirname(generated), { recursive: true });

const names = (await readdir(source)).filter((name) => pattern.test(name));
names.sort((a, b) => {
  const difference = Number(a.match(pattern)[1]) - Number(b.match(pattern)[1]);
  return difference || a.localeCompare(b);
});

const usedNumbers = new Set();
const photos = [];
for (const name of names) {
  const number = Number(name.match(pattern)[1]);
  if (usedNumbers.has(number)) {
    throw new Error(`이미지 번호 ${number}가 중복되었습니다. 확장자가 달라도 번호는 하나만 사용해주세요.`);
  }
  usedNumbers.add(number);
  const from = path.join(source, name);
  const to = path.join(destination, name);
  const [fromStat, toStat] = await Promise.all([stat(from), stat(to).catch(() => null)]);
  if (!toStat || fromStat.size !== toStat.size || fromStat.mtimeMs > toStat.mtimeMs) {
    await copyFile(from, to);
  }
  const { width, height } = await sharp(from).metadata();
  if (!width || !height) throw new Error(`${name}의 크기를 읽을 수 없습니다.`);
  photos.push({ number, src: `/images/${name}`, width, height });
}

await writeFile(
  generated,
  `// 자동 생성 파일입니다. 사진 순서는 src/lib/image-config.ts에서 조정하세요.\n` +
    `export const discoveredImages = ${JSON.stringify(photos, null, 2)} as const;\n`,
  "utf8",
);
console.log(`[images] ${photos.length}개 사진 확인: ${photos.map((p) => p.number).join(", ") || "없음"}`);
