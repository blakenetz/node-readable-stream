import prompts from "prompts";

import {
  asyncIteratorMode,
  flowMode,
  pauseMode,
} from "./scripts/readable-flow";

const scripts: (prompts.Choice & { fn: () => Promise<void> })[] = [
  {
    title: "Pause Mode",
    value: "pause-mode",
    description: "Uses `readable` listener",
    fn: pauseMode,
  },
  {
    title: "Pause Mode (invalid async)",
    value: "pause-mode-async",
    description: "Incorrect use of async in `readable` listener",
    fn: pauseMode.bind(null, true),
  },
  {
    title: "Flow Mode",
    value: "flow-mode",
    description: "Uses `data` listener",
    fn: flowMode,
  },
  {
    title: "Flow Mode (invalid async)",
    value: "flow-mode-async",
    description: "Incorrect use of async in `data` listener",
    fn: flowMode.bind(null, true),
  },
  {
    title: "Async Iterator Mode",
    value: "async-iterator-mode",
    description: "Uses `for await`",
    fn: asyncIteratorMode,
  },
];

const main = async () => {
  const response = await prompts({
    type: "select",
    name: "script",
    message: "Which script would you like to run?",
    choices: scripts.map(({ fn: _fn, ...choice }) => choice),
  });

  if (response.script) {
    const script = scripts.find((script) => script.value === response.script);
    await script?.fn();
  }
};

main();
