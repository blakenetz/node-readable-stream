# Node.js Readable Streams

This repository contains a series of scripts that demonstrate the inner workings of Node.js Readable Streams.

## Scripts

- `setup`: Generates a txt files with some random data
- `start`: Prompts the user for which example to run

## Cases

- `Pause Mode`: Listens to the `readable` event
- `Flow Mode`: Listens to the `data` event
- `Async Iterator Mode`: Uses `for await` loop

### Logs

Each case listed above logs out the [readable state](https://nodejs.org/api/stream.html#readablereadablehighwatermark:~:text=data%27%20event%20handler.-,Three%20states,-%23) and the chunk size for 3 lifecycle stages: `start`, `chunk`, and `end`. It also logs the total execution time.

### Async Implementation

`Pause` and `Flow` modes both show an incorrect implementation of async by demonstrating that though the event handler is async, the stream is not.

### Watermark

The `highWaterMark` option is used to set the buffer size for the stream. See [documentation](https://nodejs.org/api/stream.html#readablereadablehighwatermark:~:text=is%20not%20safe.-,Buffering,-%23) for more information.
