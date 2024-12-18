import { initializeReadStream, log } from "../utils";

async function main() {
  const stream = initializeReadStream();

  console.log(`Initialize using \`readable\` listener`);
  log("start", stream.readableFlowing);

  stream.on("readable", async () => {
    const chunk = stream.read();

    if (chunk !== null)
      log("chunk", stream.readableFlowing, `${chunk.length} bytes`);
  });

  stream.on("error", console.error);

  stream.on("end", () => {
    log("end", stream.readableFlowing);
  });
}

main();
