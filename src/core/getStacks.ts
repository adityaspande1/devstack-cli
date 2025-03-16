import fs from "fs";
import path from "path";

interface StackMetaData{
    name:string,
    description?:string,
    types:string[]
}

interface StackInfo{
    category:"frontend"|"backend",
    metadata:StackMetaData,
    name:string
}

export function getStacks():StackInfo[]{
    const stacksDir=path.join(__dirname,"..","stacks");
    const categories:string[]=["frontend","backend"];
    const allStacks:StackInfo[]=[];

    for(const category of categories){
        const categoryDir=path.join(stacksDir,category);
        const stackFolders=fs.readdirSync(categoryDir);
        for(const stackName of stackFolders){
            const metadataPath = path.join(categoryDir, stackName, "metadata.json");
            if (!fs.existsSync(metadataPath)) continue;

            const metadata = JSON.parse(
                fs.readFileSync(metadataPath, "utf-8")
            ) as StackMetaData;

            allStacks.push({
                category: category as "frontend" | "backend",
                name: stackName,
                metadata,
            });
        }
        
    }
    return allStacks;
}