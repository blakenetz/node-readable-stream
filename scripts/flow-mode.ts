import { initializeReadStream, log, wait } from "../utils";

async function main() {
  const stream = initializeReadStream();
  console.log(`Initialize using \`data\` listener`);
  log("start", stream.readableFlowing);

  stream.on("data", async (chunk) => {
    log("chunk", stream.readableFlowing, `${chunk.length} bytes`);
  });

  stream.on("error", console.error);

  stream.on("end", () => {
    log("end", stream.readableFlowing);
  });
}

main();
