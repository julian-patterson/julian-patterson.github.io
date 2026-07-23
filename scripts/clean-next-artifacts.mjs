import { rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artifactDirectories = [".next", ".next-dev"];

for (const directory of artifactDirectories) {
  rmSync(resolve(root, directory), { recursive: true, force: true });
  console.log(`Removed ${directory}`);
}
