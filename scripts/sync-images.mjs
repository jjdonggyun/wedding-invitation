import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "images");
const destination = path.join(root, "public", "images");
const generated = path.join(root, "src", "generated", "images.ts");
const imageExtension = /\.(jpe?g|png|webp|avif)$/i;
const roleRank = { hero: 0, story: 1, gallery: 2, ending: 3, share: 4 };

await mkdir(source, { recursive: true });
await mkdir(destination, { recursive: true });
await mkdir(path.dirname(generated), { recursive: true });

function parseImageName(filename) {
  const stem = path.parse(filename).name.toLowerCase();
  if (stem.startsWith("none-")) return { ignored: true };
  if (stem === "hero") return { id: stem, role: "hero", order: 0, featured: false };
  if (stem === "story-intro") return { id: stem, role: "story", order: 0, featured: false };
  if (stem === "story-couple") return { id: stem, role: "story", order: 1, featured: false };
  const cinematic = stem.match(/^story-cinematic-(\d+)$/);
  if (cinematic) return { id: stem, role: "story", order: Number(cinematic[1]) + 1, featured: false };
  const gallery = stem.match(/^gallery-(\d+)(-featured)?$/);
  if (gallery) return { id: stem, role: "gallery", order: Number(gallery[1]), featured: Boolean(gallery[2]) };
  if (stem === "ending") return { id: stem, role: "ending", order: 0, featured: false };
  if (stem === "share") return { id: stem, role: "share", order: 0, featured: false };
  return null;
}

const sourceNames = (await readdir(source)).filter((name) => imageExtension.test(name));
const ignoredNames = [];
const unsupportedNames = [];
const candidates = [];

for (const name of sourceNames) {
  const parsed = parseImageName(name);
  if (parsed?.ignored) {
    ignoredNames.push(name);
    continue;
  }
  if (!parsed) {
    unsupportedNames.push(name);
    continue;
  }
  candidates.push({ name, ...parsed });
}

candidates.sort((a, b) => roleRank[a.role] - roleRank[b.role] || a.order - b.order || a.name.localeCompare(b.name));

const usedSlots = new Set();
for (const photo of candidates) {
  const slot = photo.role === "gallery" || photo.role === "story" ? `${photo.role}:${photo.order}` : photo.role;
  if (usedSlots.has(slot)) throw new Error(`${photo.name}이 이미 사용 중인 이미지 위치 ${slot}와 중복됩니다.`);
  usedSlots.add(slot);
}

for (const photo of candidates) {
  const buffer = await readFile(path.join(source, photo.name));
  const version = createHash("sha256").update(buffer).digest("hex").slice(0, 12);
  const parsedPath = path.parse(photo.name);
  photo.version = version;
  photo.destinationName = `${parsedPath.name}.${version}${parsedPath.ext.toLowerCase()}`;
}

const activeNames = new Set(candidates.map(({ destinationName }) => destinationName));
const destinationNames = (await readdir(destination)).filter((name) => imageExtension.test(name));
await Promise.all(destinationNames.filter((name) => !activeNames.has(name)).map((name) => unlink(path.join(destination, name))));

const photos = [];
for (const { name, destinationName, version, id, role, order, featured } of candidates) {
  const from = path.join(source, name);
  const to = path.join(destination, destinationName);
  const [fromStat, toStat] = await Promise.all([stat(from), stat(to).catch(() => null)]);
  if (!toStat || fromStat.size !== toStat.size || fromStat.mtimeMs > toStat.mtimeMs) await copyFile(from, to);
  const { width, height } = await sharp(from).metadata();
  if (!width || !height) throw new Error(`${name}의 크기를 읽을 수 없습니다.`);
  photos.push({ id, role, order, featured, src: `/images/${destinationName}`, version, width, height });
}

await writeFile(
  generated,
  `// 자동 생성 파일입니다. images 폴더의 역할 기반 파일명에서 생성됩니다.\n` +
    `export const discoveredImages = ${JSON.stringify(photos, null, 2)} as const;\n`,
  "utf8",
);

if (unsupportedNames.length) console.warn(`[images] 지원하지 않는 파일명이라 제외: ${unsupportedNames.join(", ")}`);
console.log(`[images] 사용 ${photos.length}개: ${photos.map((photo) => photo.id).join(", ") || "없음"}`);
console.log(`[images] none 제외 ${ignoredNames.length}개${ignoredNames.length ? `: ${ignoredNames.join(", ")}` : ""}`);
