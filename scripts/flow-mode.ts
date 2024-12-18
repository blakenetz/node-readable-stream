import { initializeReadStream, wait } from "../utils";

async function main() {
  const stream = initializeReadStream();

  console.log("Starting to read file");

  stream.on("data", async (chunk) => {
    console.log(chunk.toString());
  });

  stream.on("error", (error) => {
    console.error("Error reading file:", error);
  });

  stream.on("end", () => {
    console.log("Finished reading file");
  });
}

main();
