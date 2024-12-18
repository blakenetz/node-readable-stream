import { createReadStream } from "node:fs";
import { dataFile, wait } from "../utils";

const log = (
  stage: "start" | "chunk" | "end",
  readableFlowing: boolean | null,
  chunkLength?: number
) => {
  console.log(
    `[${stage}] ${[
      `readableFlowing: ${readableFlowing}`,
      chunkLength ? `${chunkLength} bytes` : false,
    ]
      .filter(Boolean)
      .join(" | ")}`
  );
};

export const initializeReadStream = () => {
  return createReadStream(dataFile, { encoding: "utf8" });
};

export async function pauseMode(async: boolean = false) {
  console.log(`Initialize using \`readable\` listener`);

  const stream = initializeReadStream();
  log("start", stream.readableFlowing);

  stream.on("readable", async () => {
    const chunk = stream.read();
    if (async) await wait();

    if (chunk !== null) log("chunk", stream.readableFlowing, chunk.length);
  });

  stream.on("error", console.error);

  stream.on("end", () => {
    log("end", stream.readableFlowing);
  });
}

export async function flowMode(async: boolean = false) {
  console.log(`Initialize using \`data\` listener`);

  const stream = initializeReadStream();
  log("start", stream.readableFlowing);

  stream.on("data", async (chunk) => {
    if (async) await wait();
    log("chunk", stream.readableFlowing, chunk.length);
  });

  stream.on("error", console.error);

  stream.on("end", () => {
    log("end", stream.readableFlowing);
  });
}
