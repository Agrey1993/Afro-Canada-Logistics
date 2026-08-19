import { copyFileSync, existsSync, mkdirSync } from "node:fs";

const workerEntry = "dist/server/index.js";
const hostingSource = ".openai/hosting.json";
const hostingTarget = "dist/.openai/hosting.json";

if (!existsSync(workerEntry)) {
  throw new Error(`Missing Sites worker entry: ${workerEntry}`);
}

if (!existsSync(hostingSource)) {
  throw new Error(`Missing Sites metadata: ${hostingSource}`);
}

mkdirSync("dist/.openai", { recursive: true });
copyFileSync(hostingSource, hostingTarget);
