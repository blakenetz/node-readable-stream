import prompts from "prompts";

import execute from "./scripts/readable-flow";
import { Values } from "./utils";

type Choice = Omit<prompts.Choice, "value"> & { value: Values };

const choices: Choice[] = [
  {
    title: "Pause Mode",
    value: "pause-mode",
    description: "Uses `readable` listener",
  },
  {
    title: "Flow Mode",
    value: "flow-mode",
    description: "Uses `data` listener",
  },
  {
    title: "Async Iterator Mode",
    value: "async-iterator-mode",
    description: "Uses `for await`",
  },
];

const main = async () => {
  const questions: prompts.PromptObject<string>[] = [
    {
      type: "select",
      name: "script",
      message: "Which script would you like to run?",
      choices,
    },
    {
      type: (prev) => (prev === "async-iterator-mode" ? null : "confirm"),
      name: "async",
      message: "Demonstrate incorrect async implementation?",
      initial: false,
    },
    {
      type: "number",
      name: "watermark",
      message: "Updated highWaterMark value?",
      initial: 65536,
    },
  ];

  const response = await prompts(questions);

  if (response.script) {
    await execute(response.script, response.async, {
      highWaterMark: response.watermark,
    });
  }
};

main();
