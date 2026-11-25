import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const source = join(".", "POST.json");
const target = join(outDir, "POST.json");

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
  console.log(`wrote ${target}`);
} catch (err) {
  console.error("failed to copy POST.json:", err);
  process.exit(1);
}
