import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const latitude = 37.5823258;
const longitude = 126.8867101;
const zoom = 16;
const tileSize = 256;
const gridSize = 3;
const outputSize = 720;
const tileCount = 2 ** zoom;
const latitudeRadians = latitude * Math.PI / 180;
const xFloat = (longitude + 180) / 360 * tileCount;
const yFloat = (1 - Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians)) / Math.PI) / 2 * tileCount;
const centerTileX = Math.floor(xFloat);
const centerTileY = Math.floor(yFloat);
const firstTileX = centerTileX - 1;
const firstTileY = centerTileY - 1;

const tiles = await Promise.all(Array.from({ length: gridSize * gridSize }, async (_, index) => {
  const column = index % gridSize;
  const row = Math.floor(index / gridSize);
  const x = firstTileX + column;
  const y = firstTileY + row;
  const response = await fetch(`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`, {
    headers: { "User-Agent": "donggyun-tsukina-wedding-invitation/1.0 (static venue map)" },
  });
  if (!response.ok) throw new Error(`Map tile ${x}/${y} failed: ${response.status}`);
  return { input: Buffer.from(await response.arrayBuffer()), left: column * tileSize, top: row * tileSize };
}));

const canvasSize = gridSize * tileSize;
const centerX = (xFloat - firstTileX) * tileSize;
const centerY = (yFloat - firstTileY) * tileSize;
const left = Math.max(0, Math.min(canvasSize - outputSize, Math.round(centerX - outputSize / 2)));
const top = Math.max(0, Math.min(canvasSize - outputSize, Math.round(centerY - outputSize / 2)));
const canvas = await sharp({ create: { width: canvasSize, height: canvasSize, channels: 3, background: "#f4f1eb" } })
  .composite(tiles)
  .png()
  .toBuffer();
const output = await sharp(canvas)
  .extract({ left, top, width: outputSize, height: outputSize })
  .modulate({ saturation: 0.82, brightness: 1.02 })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(path.join(process.cwd(), "public", "venue-map.png"), output);
console.log("[map] public/venue-map.png 생성 완료");
