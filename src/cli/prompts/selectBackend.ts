import inquirer from "inquirer";

export async function selectBackend():Promise<string>{
    
    const {backend}= await inquirer.prompt([
        {
            type:"list",
            name:"backend",
            message:"Select Backend Framework:",
            choices:["express","fastApi","flask","nestjs"]
        },
    ]);

    return backend;
}