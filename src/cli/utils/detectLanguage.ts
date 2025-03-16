export function detectLanguage(
type:"frontend"|"backend",
framework:string
){
const RecordMap:Record<string,string>={
    "react-vite":"typescript",
    "nextjs-app":"typescript",
    "sveltekit":"typescript",
    "express":"javascript",
    "fastApi":"python",
    "flask":"python",
    "nestjs":"typescript"
}

return RecordMap[framework];
}