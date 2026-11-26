import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// post-x-promote: the entry is a single pre-rendered POST.json.
// The grader runs `node /bot/main.ts` (node22) with a READ-ONLY
// filesystem, the repo at /bot and an empty writable /output bind
// mount. So the output path must be the absolute /output — never a
// relative path and never an env var — and the source must be
// resolved from this script's own directory, never from the
// working directory.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "POST.json");
// /output is the grader's bind mount: only ever write into it,
// never delete it or re-create it.
const outDir = "/output";

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, join(outDir, "POST.json"));
} catch (err) {
  console.error("failed to copy POST.json to /output:", err);
  process.exit(1);
}
