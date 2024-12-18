import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dataDir, dataFile } from "../utils";

async function main() {
  try {
    // generate data dir
    if (!existsSync(dataDir)) {
      console.log(`Creating directory: ${dataDir}`);
      mkdirSync(dataDir);
    }

    // generate data file
    console.log(`Creating file: ${dataFile}`);
    const content = Array.from(
      { length: 100000 },
      (_, i) => `Line ${i + 1}`
    ).join("\n");

    writeFileSync(dataFile, content);
  } catch (error) {
    console.error("Error checking file:", error);
    process.exit(1);
  }
}

main();
