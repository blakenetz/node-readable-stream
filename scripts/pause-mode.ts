import { initializeReadStream, wait } from "../utils";

async function main() {
  const stream = initializeReadStream();

  console.log(`INIT! initial flow state: ${stream.readableFlowing}`);

  stream.on("readable", async () => {
    const chunk = stream.read();

    if (chunk !== null) console.log(chunk.toString());
  });

  console.log(`active flow state: ${stream.readableFlowing}`);

  stream.on("error", (error) => {
    console.error("Error reading file:", error);
  });

  stream.on("end", () => {
    console.log(`FINAL! flow state: ${stream.readableFlowing}`);
  });
}

main();
