#!/usr/bin/env node
import inquirer from "inquirer";
import { getStacks } from "../core/getStacks";

type ProjectConfig = {
  name: string;
  frontend: {
    framework: string;
    language: string;
  };
  backend: {
    framework: string;
    language: string;
  };
};

async function run() {
  const stacks = getStacks();

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
    },
  ]);

  const frontendStacks = stacks.filter((s) => s.category === "frontend");
  const backendStacks = stacks.filter((s) => s.category === "backend");

  const { selectedFrontend } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedFrontend",
      message: "Select a frontend stack:",
      choices: frontendStacks.map((stack) => ({
        name: `${stack.metadata.name}`,
        value: stack,
      })),
    },
  ]);

  const { selectedBackend } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedBackend",
      message: "Select a backend stack:",
      choices: backendStacks.map((stack) => ({
        name: `${stack.metadata.name}`,
        value: stack,
      })),
    },
  ]);

  const { frontendLang } = await inquirer.prompt([
    {
      type: "list",
      name: "frontendLang",
      message: `Select language for ${selectedFrontend.metadata.name}:`,
      choices: selectedFrontend.metadata.types,
    },
  ]);

  const { backendLang } = await inquirer.prompt([
    {
      type: "list",
      name: "backendLang",
      message: `Select language for ${selectedBackend.metadata.name}:`,
      choices: selectedBackend.metadata.types,
    },
  ]);

  const config: ProjectConfig = {
    name: projectName,
    frontend: {
      framework: selectedFrontend.name,
      language: frontendLang,
    },
    backend: {
      framework: selectedBackend.name,
      language: backendLang,
    },
  };

  console.log("\nYour project config:");
  console.log(JSON.stringify(config, null, 2));

 
}

run();
