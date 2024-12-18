import fs from "node:fs";
import { resolve } from "node:path";
import prompts from "prompts";

const blacklist = ["setup.ts"];

const scriptDir = resolve(__dirname, "scripts");

const main = async () => {
  const files = fs
    .readdirSync(scriptDir)
    .filter((file) => !blacklist.includes(file));

  const response = await prompts({
    type: "select",
    name: "file",
    message: "Which script would you like to run?",
    choices: files.map((file) => ({
      title: file.replace(".ts", "").replace(/_|-/g, " "),
      value: file,
    })),
  });

  if (response.file) {
    const filePath = resolve(scriptDir, response.file);
    await import(filePath);
  }
};

main();
