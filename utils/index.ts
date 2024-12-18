import { createReadStream } from "node:fs";
import { resolve } from "node:path";

export const dataDir = resolve(__dirname, "..", "data");
export const dataFile = resolve(dataDir, "content.txt");

export const initializeReadStream = () => {
  return createReadStream(dataFile, { encoding: "utf8" });
};

export const wait = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const log = (
  stage: "start" | "chunk" | "end",
  readableFlowing: boolean | null,
  content?: string
) => {
  console.log(
    `[${stage}] ${[`readableFlowing: ${readableFlowing}`, content]
      .filter(Boolean)
      .join(" | ")}`
  );
};
