import { createReadStream } from "node:fs";
import { dataFile, Values } from "../utils";
import { ReadableOptions } from "node:stream";

const defaultOptions: ReadableOptions = {
  highWaterMark: 65536,
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

export const wait = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function pauseMode(async: boolean, options: ReadableOptions) {
  console.time(timeLabel);

  const stream = createReadStream(dataFile, { ...defaultOptions, ...options });
  log("start", stream.readableFlowing);

  stream.on("readable", async () => {
    const chunk = stream.read();
    if (async) await wait();

    if (chunk !== null) log("chunk", stream.readableFlowing, chunk.length);
  });

  stream.on("error", console.error);

  stream.on("end", () => {
    log("end", stream.readableFlowing);
    console.timeEnd(timeLabel);
    if (async) console.log("here comes the data...");
  });
}

async function flowMode(async: boolean, options: ReadableOptions) {
  console.time(timeLabel);

  const stream = createReadStream(dataFile, { ...defaultOptions, ...options });
  log("start", stream.readableFlowing);

  stream.on("data", async (chunk) => {
    if (async) await wait();
    log("chunk", stream.readableFlowing, chunk.length);
  });

  stream.on("error", console.error);

  stream.on("end", () => {
    log("end", stream.readableFlowing);
    console.timeEnd(timeLabel);
    if (async) console.log("here comes the data...");
  });
}

async function asyncIteratorMode(options: ReadableOptions) {
  console.time(timeLabel);

  const stream = createReadStream(dataFile, { ...defaultOptions, ...options });
  log("start", stream.readableFlowing);

  for await (const chunk of stream) {
    log("chunk", stream.readableFlowing, chunk.length);
  }

  log("end", stream.readableFlowing);
  console.timeEnd(timeLabel);
}

export default async function execute(
  mode: Values,
  async: boolean,
  options: ReadableOptions
) {
  switch (mode) {
    case "pause-mode":
      return pauseMode(async, options);
    case "flow-mode":
      return flowMode(async, options);
    case "async-iterator-mode":
      return asyncIteratorMode(options);
  }
}
