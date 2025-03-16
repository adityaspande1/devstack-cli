import inquirer from "inquirer"

export async function selectFrontend(): Promise<string> {
  const { frontend } = await inquirer.prompt([
    {
      type: "list",
      name: "frontend",
      message: "Select Frontend Framework:",
      choices: ["react-vite", "nextjs-app", "sveltekit"],
    },
  ])
  return frontend
}
