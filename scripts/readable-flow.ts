import { createReadStream, ReadStream } from "node:fs";
import { dataFile, Values } from "../utils";
import { ReadableOptions } from "node:stream";

const defaultOptions: ReadableOptions = {
  encoding: "utf8",
};

const timeLabel = "🕐 Total execution time";

const log = (
  stage: "start" | "chunk" | "end",
  readableFlowing: boolean | null,
  chunkLength?: number
) => {
  console.log(
    `[${stage}] ${[
      `flowing: ${readableFlowing}`,
      chunkLength ? `${chunkLength} bytes` : false,
    ]
      .filter(Boolean)
      .join(" | ")}`
  );
};

const wait = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default async function execute(
  mode: Values,
  async: boolean,
  options: ReadableOptions
) {
  // start timer
  console.time(timeLabel);

  // initialize stream with handler
  const stream = createReadStream(dataFile, { ...defaultOptions, ...options });
  stream.on("error", console.error);
  stream.on("end", () => {
    log("end", stream.readableFlowing);
    if (async) console.log("here comes the data...");
  });

  log("start", stream.readableFlowing);

  // add chunk handling
  switch (mode) {
    case "pause-mode":
      stream.on("readable", async () => {
        const chunk = stream.read();
        if (async) await wait();

        if (chunk !== null) log("chunk", stream.readableFlowing, chunk.length);
      });
      break;

    case "flow-mode":
      stream.on("data", async (chunk) => {
        if (async) await wait();
        log("chunk", stream.readableFlowing, chunk.length);
      });
      break;

    case "async-iterator-mode":
      for await (const chunk of stream) {
        log("chunk", stream.readableFlowing, chunk.length);
      }
      break;
  }

  // end timer
  console.timeEnd(timeLabel);
}
