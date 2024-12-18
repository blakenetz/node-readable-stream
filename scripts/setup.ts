import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dataFile = resolve(__dirname, "..", "data", "content.txt");

const createNewFile = () => {
  const content = Array.from(
    { length: 1000000 },
    (_, i) => `Line ${i + 1}`
  ).join("\n");

  writeFileSync(dataFile, content);
  try {
    console.log(`Successfully created file: ${dataFile}`);
  } catch (error) {
    console.error(`Error creating file ${dataFile}:`, error);
    process.exit(1);
  }
};

async function main() {
  try {
    if (existsSync(dataFile)) {
      console.log(`File already exists: ${dataFile}`);
      return;
    }
    createNewFile();
  } catch (error) {
    console.error("Error checking file:", error);
    process.exit(1);
  }
}

main();
