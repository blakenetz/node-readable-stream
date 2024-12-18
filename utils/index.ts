import { resolve } from "node:path";

export const dataDir = resolve(__dirname, "..", "data");
export const dataFile = resolve(dataDir, "content.txt");

export type Values = "pause-mode" | "flow-mode" | "async-iterator-mode";
