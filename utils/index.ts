import { resolve } from "node:path";

export const dataDir = resolve(__dirname, "..", "data");
export const dataFile = resolve(dataDir, "content.txt");

export const wait = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
